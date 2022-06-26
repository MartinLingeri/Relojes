import { Global } from "@emotion/react";
import { useState, useMemo } from "react";
import axios from "axios";
import { Stack, Box, Heading } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import LcdClock from "./lcdClock";

import Props from "./clockProps";

interface UploadedFile {
  fileName: string;
  filePath: string;
}

const dropzoneStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  padding: "20px",
  borderWidth: 5,
  borderRadius: 10,
  borderColor: "#000000CC",
  borderStyle: "dashed",
  fontWeight: "bold",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
};

function LcdCustom(props: Props) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile>({
    fileName: "radioland",
    filePath: "./fonts/radioland.ttf",
  });
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "font/ttf": [".ttf"] },
      multiple: false,
      onDrop: (files: Array<File>) => handleOnDrop(files),
    });

  async function handleOnDrop(files: Array<File>) {
    const form = new FormData();
    form.append("customFont", files[0]);

    try {
      setLoading(true);
      const res = await axios
        .post("https://customclocks.herokuapp.com/uploads", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setLoading(false);
          return res;
        });

      var fileName = res.data.font.fileName;
      fileName = fileName.slice(0, fileName.length - 4); //substract .ttf

      const filePath = res.data.font.filePath;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        reportError({ message: err.message });
      }
    }
  }

  const focusedDropzoneStyle = {
    borderColor: "#2C5282",
    borderStyle: "solid",
  };

  const acceptDropzoneStyle = {
    borderColor: "#276749",
    borderStyle: "solid",
  };

  const rejectDropzoneStyle = {
    borderColor: "#9B2C2C",
    borderStyle: "solid",
  };

  const style = useMemo(
    () => ({
      ...dropzoneStyle,
      ...(isFocused ? focusedDropzoneStyle : {}),
      ...(isDragAccept ? acceptDropzoneStyle : {}),
      ...(isDragReject ? rejectDropzoneStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      <Global
        styles={` 
          @font-face {
          font-family: 'custom';
          font-style: normal;
          font-weight: 700;
          src: url(${uploadedFile.filePath}) format('truetype');
          font-display: swap;
        }`}
      />
      <Stack alignItems="center" justifyContent="center" gap={8}>
        <LcdClock
          date={props.date}
          name={props.name}
          font="custom"
          shadow={props.shadow}
        />
        {loading ? (
          <Heading color="#000000CC">Loading font ...</Heading>
        ) : (
          <Heading color="#000000CC" textTransform="capitalize">
            Font: {uploadedFile.fileName}
          </Heading>
        )}
        <Box>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} accept=".ttf"/>
            <p>Click to add your font</p>
          </div>
        </Box>
      </Stack>
    </>
  );
}

export default LcdCustom;
