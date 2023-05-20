import { React, useState, useEffect } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { getWeekdayName } from "../helpers";

const MedicineTracker = () => {
  const [medicineText, setMedicineText] = useState("");
  const [secondMedicineText, setSecondMedicineText] = useState("");
  const [medicineName, setMedicineName] = useState(() => {
    const savedName = localStorage.getItem("medicineTrackerData");
    if (savedName != null) {
      return JSON.parse(savedName).medicineName;
    } else {
      return "";
    }
  });
  const [secondMedicineName, setSecondMedicineName] = useState(() => {
    const savedSecondName = localStorage.getItem("medicineTrackerData");
    if (savedSecondName != null) {
      return JSON.parse(savedSecondName).secondMedicineName;
    } else {
      return "";
    }
  });
  const [isCheckedDays, setIsCheckedDays] = useState(() => {
    const savedChecks = localStorage.getItem("medicineTrackerData");
    if (savedChecks != null) {
      return JSON.parse(savedChecks).isCheckedDays;
    } else {
      return Array.from({ length: 7 }, () => [false, false]);
    }
  });

  const handleMedicineNameChange = (e) => {
    setMedicineText(e.target.value);
  };
  const handleSecondMedicineNameChange = (e) => {
    setSecondMedicineText(e.target.value);
  };

  const handleMedicineNameSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("medicineTrackerData", JSON.stringify({ medicineName: medicineText, isCheckedDays }));
    setMedicineName(medicineText);
  };
  const handleSecondMedicineNameSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "medicineTrackerData",
      JSON.stringify({ secondMedicineName: secondMedicineText, isCheckedDays })
    );
    setSecondMedicineName(secondMedicineText);
  };

  const handleCheckboxDaysChange = (e, index, medicationIndex) => {
    const newIsCheckedDays = [...isCheckedDays];
    newIsCheckedDays[index][medicationIndex] = e.target.checked;
    setIsCheckedDays(newIsCheckedDays);
  };

  useEffect(() => {
    localStorage.setItem("medicineTrackerData", JSON.stringify({ medicineName, secondMedicineName, isCheckedDays }));
  }, [medicineName, secondMedicineName, isCheckedDays]);

  const handleClearButtonClick = () => {
    if (window.confirm("Are you sure you want to reset the log?")) {
      localStorage.clear();
      window.location.reload();
      window.alert("Log has been reset");
    }
  };

  const handleClearCheckboxes = () => {
    if (window.confirm("Are you sure you want to clear the checkboxes?")) {
      localStorage.setItem("medicineTrackerData", JSON.stringify({ medicineName }));
      setIsCheckedDays(Array.from({ length: 7 }, () => [false, false]));
      window.location.reload();
      window.alert("Boxes have been reset");
    }
  };

  return (
    <Container alignItems="center" maxWidth="md">
      <Typography
        align="center"
        variant="h3"
        gutterBottom
        fontFamily="Wix Madefor Text"
        fontWeight="600"
        sx={{ marginTop: "10px" }}
      >
        Medicine Tracker
      </Typography>
      <Container>
        <Box align="center">
          <form onSubmit={handleMedicineNameSubmit}>
            <TextField
              variant="outlined"
              placeholder="First Medicine"
              onChange={handleMedicineNameChange}
              sx={{ minWidth: "300px", marginBottom: "8px" }}
            />
          </form>
        </Box>
        <Box align="center">
          <form onSubmit={handleSecondMedicineNameSubmit}>
            <TextField
              variant="outlined"
              placeholder="Second Medicine"
              onChange={handleSecondMedicineNameChange}
              sx={{ minWidth: "300px" }}
            />
          </form>
        </Box>

        <Paper elevation={3} sx={{ backgroundColor: "#F1F6F9" }}>
          {[...Array(7)].map((_, index) => (
            <Box key={index} sx={{ margin: "8px" }}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  fontFamily="Wix Madefor Text"
                  fontWeight="600"
                  sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "10px" }}
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
                        sx={{ transform: "scale(1.5)", marginLeft: "8px", marginBottom: "10px" }}
                      />
                    }
                    label=<Typography
                      gutterBottom
                      sx={{ fontSize: "1.3rem", fontFamily: "Wix Madefor Text", fontWeight: "400" }}
                    >
                      {medicineName}
                    </Typography>
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isCheckedDays[index][1]}
                        onChange={(e) => handleCheckboxDaysChange(e, index, 1)}
                        sx={{ transform: "scale(1.5)", marginLeft: "8px" }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "1.3rem", fontFamily: "Wix Madefor Text", fontWeight: "400" }}>
                        {secondMedicineName}
                      </Typography>
                    }
                  />
                </Box>
              </Grid>
            </Box>
          ))}
        </Paper>
        <Box align="center" marginBottom="100px" sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" onClick={handleClearCheckboxes} sx={{ minWidth: "200px", marginTop: "50px" }}>
            Clear Checkboxes
          </Button>
          <Button variant="contained" onClick={handleClearButtonClick} sx={{ minWidth: "200px", marginTop: "10px" }}>
            Clear Everything
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default MedicineTracker;
