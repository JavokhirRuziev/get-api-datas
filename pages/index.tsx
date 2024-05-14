import axios from "axios";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Base from "@/components/TextFields/Base";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function Home() {
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) =>
    setValue(e.target.value);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (value) {
      axios
        .get(value)
        .then((res) => {
          console.log(res.data);
          const string = JSON.stringify(res.data);
          setDisplayValue(string);
        })
        .catch((err) => alert(err));
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(value);
      const data = response.data;

      const zip = new JSZip();
      zip.file("data.json", JSON.stringify(data));

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "data.zip");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Paper
      component={"div"}
      sx={{ p: 4, display: "flex", flexDirection: "column", rowGap: "30px" }}
    >
      <Base value={value} onChange={handleChange} onSubmit={handleSubmit} />
      <Box>
        <Button
          type="button"
          onClick={handleDownload}
          disabled={!displayValue}
          variant="contained"
        >
          Download as ZIP
        </Button>
      </Box>
      <Typography variant="subtitle2" overflow={"hidden"}>
        {displayValue}
      </Typography>
    </Paper>
  );
}
