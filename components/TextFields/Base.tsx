import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AdsClick from "@mui/icons-material/AdsClick";

// types.ts
interface inputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: { preventDefault: () => void }) => void;
}

export default ({ value, onChange, onSubmit }: inputProps) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      onSubmit={onSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Paste api url"
        fullWidth
        value={value}
        onChange={onChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} type="submit">
        <AdsClick />
      </IconButton>
    </Paper>
  );
};
