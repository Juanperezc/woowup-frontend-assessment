import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TiptapControlledComponent from "@/components/Tiptap/Tiptap";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { useReCaptcha } from "next-recaptcha-v3";
import MailService from "@/services/MailService";
import sweetAlert from "@/utils/sweetAlert";

// Define a schema
const schema = yup.object().shape({
  text: yup.string().required("Este campo es obligatorio"),
  title: yup.string().required("Este campo es obligatorio"),
  emails: yup
    .array()
    .of(yup.string().email("Debe ser un email válido"))
    .required("Este campo es obligatorio"),
});

const IndexPage = () => {
  const { executeRecaptcha } = useReCaptcha();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const token = await executeRecaptcha("form_submit");
    try {
      sweetAlert.loading("Sending email");
      await MailService.sendMailFailOver(
        data.title,
        data.text,
        data.emails,
        token
      );
      sweetAlert.success("Success", "Email sent successfully");
    } catch (e) {
      sweetAlert.error("Error", "An error has ocurred, please try again later");
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg bg-white shadow-lg w-1/2">
        <h1 className="text-2xl mb-4">Send email</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <Controller
              name="emails"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={[]}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Emails"
                      placeholder="Add multiple emails"
                      className="mb-2"
                      error={Boolean(errors.emails)}
                      helperText={errors.emails?.message}
                    />
                  )}
                  {...field}
                  onChange={(_, newValue) => field.onChange(newValue)}
                />
              )}
            />
            <FormHelperText>
              Press enter in order to add emails into the list
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className="mb-2"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Message</FormLabel>
            <TiptapControlledComponent
              control={control}
              name="text"
              error={errors.text?.message}
            />
          </FormControl>

          <div className="mt-2">
            <Button
              variant="contained"
              type="submit"
              className="bg-blue-500 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
