import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-native-modal";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";

import Input from "~/components/Input";

import {
  Container,
  SelectColor,
  SelectColorText,
  ColorSelected,
  ChangeColorModalContainer,
} from "./styles";
import { useSelector, useDispatch } from "react-redux";
import Button2 from "~/components/Button2";
import colors from "~/styles/colors";

import { updateBasicInformationsRequest } from "~/store/modules/auth/actions";

export default function ({}) {
  const dispatch = useDispatch();
  const _name = useSelector((state) => state.auth.name);
  const _vehicleBoard = useSelector((state) => state.auth.vehicleBoard);
  const _vehicleModel = useSelector((state) => state.auth.vehicleModel);
  const _vehicleColor = useSelector((state) => state.auth.vehicleColor);
  const loadingUpdateProfile = useSelector(
    (state) => state.auth.loadingUpdateProfile
  );

  const [modalPicker, setModalPicker] = useState(false);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Informe seu nome."),
  });

  return (
    <Container>
      <Formik
        initialValues={{
          name: _name,
          vehicleBoard: _vehicleBoard || "",
          vehicleModel: _vehicleModel || "",
          vehicleColor: _vehicleColor || "",
        }}
        onSubmit={(values) =>
          dispatch(
            updateBasicInformationsRequest(
              values.name,
              values.vehicleBoard,
              values.vehicleModel,
              values.vehicleColor
            )
          )
        }
        validationSchema={() => formSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <Input
              placeholder="ex. João da Silva"
              placeholderTextColor={`${colors.white}55`}
              color={colors.white}
              value={values.name}
              onChangeText={handleChange("name")}
              title="Seu nome"
              errorText={errors.name && touched.name ? errors.name : null}
            />

            <Input
              placeholder="ex. XXX-1258"
              placeholderTextColor={`${colors.white}55`}
              color={colors.white}
              value={values.vehicleBoard}
              onChangeText={handleChange("vehicleBoard")}
              title="Placa"
              errorText={
                errors.vehicleBoard && touched.vehicleBoard
                  ? errors.vehicleBoard
                  : null
              }
            />

            <Input
              placeholder="ex. Honda NXR 160 BROS"
              placeholderTextColor={`${colors.white}55`}
              color={colors.white}
              value={values.vehicleModel}
              onChangeText={handleChange("vehicleModel")}
              title="Modelo da moto"
              errorText={
                errors.vehicleModel && touched.vehicleModel
                  ? errors.vehicleModel
                  : null
              }
            />

            <SelectColor onPress={() => setModalPicker(true)}>
              <SelectColorText>Cor da moto</SelectColorText>

              <ColorSelected color={values.vehicleColor} />
            </SelectColor>

            <Button2
              action={handleSubmit}
              text="Salvar"
              icon="arrow-right"
              background={colors.primaryColor}
              loading={loadingUpdateProfile}
            />

            <Modal
              isVisible={modalPicker}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              onRequestClose={() => setModalPicker(false)}
              animationInTiming={300}
              onBackdropPress={() => setModalPicker(false)}
              supportedOrientations={["portrait"]}
              style={{
                margin: 0,
                padding: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChangeColorModalContainer>
                <TriangleColorPicker
                  color={values.vehicleColor}
                  onColorChange={(value) =>
                    setFieldValue("vehicleColor", fromHsv(value), handleSubmit)
                  }
                  onColorSelected={(color) => alert(`Color selected: ${color}`)}
                  onOldColorSelected={(color) =>
                    alert(`Old color selected: ${color}`)
                  }
                  style={{ flex: 1 }}
                />
              </ChangeColorModalContainer>
            </Modal>
          </>
        )}
      </Formik>
    </Container>
  );
}
