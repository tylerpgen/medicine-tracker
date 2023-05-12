import { React, useState, useEffect } from "react";
import { Box, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { getWeekdayName } from "../helpers";

const MedicineTracker = () => {
  const [medicineText, setMedicineText] = useState("");
  const [medicineName, setMedicineName] = useState(() => {
    const savedName = localStorage.getItem("medicineTrackerData");
    if (savedName != null) {
      return JSON.parse(savedName).medicineName;
    } else {
      return "";
    }
  });
  const [isCheckedDays, setIsCheckedDays] = useState(() => {
    const savedChecks = localStorage.getItem("medicineTrackerData");
    if (savedChecks != null) {
      return JSON.parse(savedChecks).isCheckedDays;
    } else {
      return Array(7).fill([false, false]);
    }
  });

  const handleMedicineNameChange = (e) => {
    setMedicineText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("medicineTrackerData", JSON.stringify({ medicineName: medicineText, isCheckedDays }));
    setMedicineName(medicineText);
  };

  const handleCheckboxDaysChange = (e, index, medicationIndex) => {
    const newIsCheckedDays = [...isCheckedDays];
    newIsCheckedDays[index][medicationIndex] = e.target.checked;
    setIsCheckedDays(newIsCheckedDays);
  };

  useEffect(() => {
    localStorage.setItem("medicineTrackerData", JSON.stringify({ medicineName, isCheckedDays }));
  }, [medicineName, isCheckedDays]);

  return (
    <Container alignItems="center" maxWidth="md">
      <Typography align="center" variant="h3" gutterBottom>
        Medicine Tracker
      </Typography>
      <Container>
        <Box align="center">
          <form onSubmit={handleSubmit}>
            <TextField variant="outlined" defaultValue={medicineName} onChange={handleMedicineNameChange} />
          </form>
          <Typography variant="h4" margin="15px">
            {medicineName}
          </Typography>
        </Box>
        {[...Array(7)].map((_, index) => (
          <Box key={index}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "15px" }}
              >
                {getWeekdayName(index)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCheckedDays[index][0]}
                      onChange={(e) => handleCheckboxDaysChange(e, index, 0)}
                    />
                  }
                  label="Medication 1"
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCheckedDays[index][1]}
                      onChange={(e) => handleCheckboxDaysChange(e, index, 1)}
                    />
                  }
                  label="Medication 2"
                />
              </Box>
            </Grid>
          </Box>
        ))}
      </Container>
    </Container>
  );
};

export default MedicineTracker;
