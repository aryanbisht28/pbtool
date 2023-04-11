import logo from "./5607.svg";
import logo1 from "./Barcode-rafiki.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NearMeIcon from "@mui/icons-material/NearMe";
import { InputAdornment, OutlinedInput, TextField, Card } from '@mui/material';
import React, { Component } from 'react';
import { Fab, TextareaAutosize, Paper } from '@mui/material';
import axios from 'axios';
import CardHeader from '@mui/material/CardHeader';
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import ImagePreview from "./imagePreview";
import Quagga from 'quagga'

class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 340,
            height: 170,
            facingMode: 'environment',
          },
          //   area: { // defines rectangle of the detection/localization area
          //     top: "10%",    // top offset
          //     right: "10%",  // right offset
          //     left: "10%",   // left offset
          //     bottom: "10%"  // bottom offset
          //   },
        },
        locator: {
          halfSample: true,
          patchSize: "large", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: true,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true
            }
          }
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['code_128_reader'],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          },
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log(err)
        }
        Quagga.start()
      },
    )
    Quagga.onDetected(this._onDetected)
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected)
  }

  _onDetected = result => {
    this.props.onDetected(result)
    Quagga.stop()
  }

  render() {
    return <div id="interactive" className="viewport" />
  }
}
const App = () => {

  const [page, setPage] = useState(1);
  const [formDataPage1, setFormDataPage1] = useState({});
  const [update1, setUpdate1] = useState({});
  const [formDataPage2, setFormDataPage2] = useState({});
  const [tagNumber, setTagNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [age, setAge] = useState("");
  const [Response, setResponse] = useState([]);
  const [age1, setAge1] = useState("");
  const [age2, setAge2] = useState("");
  const [age3, setAge3] = useState("");
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");
  const [dropdown3Value, setDropdown3Value] = useState("");
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [dataUri, setDataUri] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);
  const [dataUri1, setDataUri1] = useState(null);
  const [showCamera1, setShowCamera1] = useState(false);
  const cameraRef1 = useRef(null);
  const [results, setResults] = useState([]);

  const [scanning, setScanning] = useState(false);
  const [results1, setResults1] = useState([]);

  const [scanning1, setScanning1] = useState(false);
  const [scantagv, setscantagv] = useState(false);
  const [scanserialv, setscanserialv] = useState(false);
  const [status, setStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const onDetected = result => {
    setResults([]);
    setResults(prevResults => [...prevResults, result]);
  };
  const onDetected1 = result => {
    setResults1([]);
    setResults1(prevResults => [...prevResults, result]);
  };

  const handleScan = () => {
    setScanning(prevState => !prevState);
  };
  const scantag = () => {
    setscantagv(true);
    setscanserialv(false);
  }
  const scanserial = () => {
    setscantagv(false);
    setscanserialv(true);
  }


  function handleTakePhotoAnimationDone(dataUri) {
    console.log("takePhoto", dataUri);
    setDataUri(dataUri);
    setShowCamera(false);
  }
  function handleTakePhotoAnimationDone1(dataUri1) {
    console.log("takePhoto", dataUri1);
    alert(dataUri1);
    setDataUri1(dataUri1);
    setShowCamera1(false);
  }

  function handleCaptureClick() {
    if (!dataUri) {
      // Capture photo if no image has been taken yet
      setShowCamera(true);
    } else {
      // Clear image if already taken
      setDataUri(null);
      setShowCamera(false);
    }
  }
  function handleCaptureClick1() {
    if (!dataUri1) {
      // Capture photo if no image has been taken yet
      setShowCamera1(true);
    } else {
      // Clear image if already taken
      setDataUri1(null);
      setShowCamera1(false);
    }
  }
  const isFullscreen = false;



  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const nextPage = () => {
    setPage(page + 1);
  };

  const handleSubmitPage1 = (e) => {
    e.preventDefault();
    // Save form data for page 1
    setFormDataPage1({
      name: e.target.name.value,
    });
    nextPage();
  };

  // const handleSubmitPage2 = (e) => {
  //   e.preventDefault();
  //   // Save form data for page 2
  //   // setFormDataPage2({
  //   //   tag: e.target.Tag.value,
  //   //   serial: e.target.Serial.value,
  //   // });
  //   // nextPage();
  //   try {
  //     // Step 2: Retrieve entered values from input fields
  //     const enteredTagNumber = tagNumber.trim();
  //     const enteredSerialNumber = serialNumber.trim();

  //     // Step 3: Check if tag/serial numbers exist in 'far' dataset
  //     const farResponse = await axios.get(`/api/far/${enteredTagNumber}/${enteredSerialNumber}`);
  //     const farExists = farResponse.data.exists;

  //     // Step 4: If tag/serial numbers exist in 'far' dataset, check 'pv' dataset
  //     let pvExists = false;
  //     if (farExists) {
  //       const pvResponse = await axios.get(`/api/pv/${enteredTagNumber}/${enteredSerialNumber}`);
  //       pvExists = pvResponse.data.exists;
  //     }

  //     // Step 5: Set the 'reconciliation' value based on existence in 'pv'
  //     const newReconciliationValue = pvExists ? 1 : 0;
  //     setReconciliationValue(newReconciliationValue);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmitPage2 = async (event) => {
    event.preventDefault();
    try {
      // Step 2: Retrieve entered values from input fields

      const enteredTagNumber = event.target.Tag.value.trim();
      const enteredSerialNumber = event.target.Serial.value.trim();

      setFormDataPage2({
        tag: event.target.Tag.value,
        serial: event.target.Serial.value,
      });
      // Step 3: Check if tag/serial numbers exist in 'far' dataset
      const farResponse = await axios.get(`http://localhost:8080/api/check/far/${enteredTagNumber}/${enteredSerialNumber}`);
      setResponse(farResponse.data);
      setStatus(farResponse.data['Asset Status']);
      setRemarks(farResponse.data['Remark']);
      console.log(farResponse.data.length);
      console.log(Response.length);
      console.log(Response);
      nextPage();
    } catch (error) {
      console.error(error);
    }
  };

  const updatesubmit = async (e) => {
    e.preventDefault();
    // Submit all form data
    // setUpdate1({
    //   status: e.target.Status.value,
    //   response: e.target.Response.value,
    // });
    alert(status);
    alert(remarks);
    alert(Response['_id']);
    alert(dataUri);
    alert(dataUri1);
    const updateResponse = await axios.post(`http://localhost:8080/api/check/pv/${status}/${remarks}/${Response['_id']}`);
    window.location.href = "/"

  };
  const newsubmit = async (e) => {
    e.preventDefault();
    // Submit all form data
    // setUpdate1({
    //   status: e.target.Status.value,
    //   response: e.target.Response.value,
    // });
    const newResponse = await axios.post(`http://localhost:8080/api/check/pvnew/${e.target.newcategory.value}/${e.target.newdescription.value}/${e.target.newassetstatus.value}/${e.target.newmanufacturer.value}/${e.target.newremarks.value}/${formDataPage2.tag}/${formDataPage2.serial}/${formDataPage1.name}`);
    window.location.href = "/"

  };

  return (
    <div>
      {page === 1 && (
        <form onSubmit={handleSubmitPage1}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Box
                sx={{ minWidth: 220, marginBottom: "20px", marginTop: "-20px" }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    <NearMeIcon />
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    name="name"
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={`Site 1`}>Site 1</MenuItem>
                    <MenuItem value={`Site 2`}>Site 2</MenuItem>
                    <MenuItem value={`Site 3`}>Site 3</MenuItem>
                    <MenuItem value={`Site 4`}>Site 4</MenuItem>
                    <MenuItem value={`Site 5`}>Site 5</MenuItem>
                    <MenuItem value={`Site 6`}>Site 6</MenuItem>
                    <MenuItem value={`Site 7`}>Site 7</MenuItem>
                    <MenuItem value={`Site 8`}>Site 8</MenuItem>
                    <MenuItem value={`Site 9`}>Site 9</MenuItem>
                    <MenuItem value={`Site 10`}>Site 10</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                sx={{ minWidth: 220, marginBottom: "20px" }}
                type="submit"
                variant="contained"
                className="App-link"
              >
                Continue
              </Button>
            </header>
          </div>
        </form>
      )}
      {page === 2 && (
        <>
          <header style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 150, marginBottom: -150
          }}>
            <Paper variant="outlined" style={{ width: 340, height: 170 }}>

              {(scantagv && <Scanner onDetected={onDetected} scanning={scanning} />)}
              {(scanserialv && <Scanner onDetected={onDetected1} scanning={scanning1} />)}
            </Paper>
          </header>


          <form onSubmit={handleSubmitPage2}>
            <div className="App">
              <header className="App-header">

                <Box
                  sx={{ minWidth: 120, marginBottom: "20px", }}
                >

                  <FormControl variant="outlined">
                    <InputLabel htmlFor="Tag">Tag Number</InputLabel>
                    <OutlinedInput
                      id="Tag"
                      name="Tag"
                      label="Tag Number"
                      value={results[0] ? results[0].codeResult.code : ''}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            disableElevation
                            onClick={() => scantag()}
                          >
                            Scan
                          </Button>
                        </InputAdornment>
                      }
                    />

                  </FormControl>
                  <br></br><br></br>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="Tag">Serial Number</InputLabel>
                    <OutlinedInput
                      id="Serial"
                      name="Serial"
                      label="Serial Number"
                      value={results1[0] ? results1[0].codeResult.code : ''}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            disableElevation
                            onClick={() => scanserial()}
                          >
                            Scan
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
                <Button
                  sx={{ minWidth: 120, marginBottom: "20px" }}
                  type="submit"
                  variant="contained"
                  className="App-link"
                >
                  Continue
                </Button>
              </header>
            </div>
          </form>
        </>
      )
      }
      {
        page === 3 && (
          (Response != 'not available') ?

            <div className="App">
              <Card variant="outlined">
                <header className="App-header">
                  <CardHeader

                    title="Enter Asset Information"
                  />

                  <Box
                    sx={{ minWidth: 120, marginBottom: "20px", marginTop: "20px" }}
                  >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                      <TextField id="standard-basic" label="Category" variant="standard" value={Response['Asset Category']} />


                    </FormControl>
                    <br></br><br></br>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                      <TextField id="standard-basic" label="Asset Description" variant="standard" value={Response['Asset Description']} />


                    </FormControl>
                    <br></br><br></br>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                      <TextField id="standard-basic" label="Manufacturer Name" variant="standard" value={Response['Manufacturer Name']} />


                    </FormControl>
                    <br></br><br></br>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                      <TextField id="standard-basic" label="Asset Status" variant="standard" name="Status" defaultValue={Response['Asset Status']} onChange={(e) => { setStatus(e.target.value) }} />
                    </FormControl>
                    <br></br><br></br>
                    <FormControl variant="outlined" style={{ marginRight: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button onClick={handleCaptureClick}>
                          {dataUri ? "Retake" : "Asset Image"}
                        </button>
                        {showCamera && (
                          <Camera
                            onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                            isFullscreen={isFullscreen}
                            ref={cameraRef}
                            style={{ width: '100px', height: '100px' }}
                          />
                        )}
                        {dataUri && (
                          <ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
                        )}

                      </div>
                    </FormControl>
                    <FormControl>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button onClick={handleCaptureClick1}>
                          {dataUri1 ? "Retake" : "Serial Number"}
                        </button>
                        {showCamera1 && (
                          <Camera
                            onTakePhotoAnimationDone={handleTakePhotoAnimationDone1}
                            isFullscreen={isFullscreen}
                            ref={cameraRef1}
                          />
                        )}
                        {dataUri1 && (
                          <ImagePreview dataUri={dataUri1} isFullscreen={isFullscreen} />
                        )}
                      </div>
                    </FormControl>
                    <br></br>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Remarks"
                        multiline
                        rows={4}
                        defaultValue={Response['Remark']}
                        onChange={(e) => { setRemarks(e.target.value) }}
                        name="Response"
                      />
                    </FormControl>
                  </Box>
                  <Button
                    sx={{ minWidth: 120, marginBottom: "20px" }}
                    variant="contained"
                    className="App-link"
                    onClick={updatesubmit}
                  >
                    Continue
                  </Button>
                </header>
              </Card>
            </div>
            :
            <form onSubmit={newsubmit}>

              <div className="App">
                <Card variant="outlined">
                  <header className="App-header">
                    <CardHeader

                      title="Enter Asset Information"
                    />

                    <Box
                      sx={{ minWidth: 120, marginBottom: "20px", marginTop: "20px" }}
                    >
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                        <TextField id="standard-basic" label="Category" name="newcategory" variant="standard" />

                      </FormControl>
                      <br></br><br></br>
                      <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                        <TextField id="standard-basic" label="Asset Description" name="newdescription" variant="standard" />


                      </FormControl>
                      <br></br><br></br>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                        <TextField id="standard-basic" label="Manufacturer Name" name="newmanufacturer" variant="standard" />


                      </FormControl>
                      <br></br><br></br>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                        <TextField id="standard-basic" label="Asset Status" name="newassetstatus" variant="standard" />
                      </FormControl>
                      <br></br><br></br>
                      <FormControl variant="outlined" style={{ marginRight: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <button onClick={handleCaptureClick}>
                            {dataUri ? "Retake" : "Asset Image"}
                          </button>
                          {showCamera && (
                            <Camera
                              onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                              isFullscreen={isFullscreen}
                              ref={cameraRef}
                              style={{ width: '100px', height: '100px' }}
                            />
                          )}
                          {dataUri && (
                            <ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
                          )}

                        </div>
                      </FormControl>
                      <FormControl>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <button onClick={handleCaptureClick1}>
                            {dataUri1 ? "Retake" : "Serial Number"}
                          </button>
                          {showCamera1 && (
                            <Camera
                              onTakePhotoAnimationDone={handleTakePhotoAnimationDone1}
                              isFullscreen={isFullscreen}
                              ref={cameraRef1}
                            />
                          )}
                          {dataUri1 && (
                            <ImagePreview dataUri={dataUri1} isFullscreen={isFullscreen} />
                          )}
                        </div>
                      </FormControl>
                      <br></br>
                      <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Remarks"
                          multiline
                          rows={4}
                          name="newremarks"
                        />
                      </FormControl>
                    </Box>
                    <Button
                      sx={{ minWidth: 120, marginBottom: "20px" }}
                      type="submit"
                      variant="contained"
                      className="App-link"
                    >
                      Create new
                    </Button>
                  </header>
                </Card>
              </div>

            </form >
        )
      }


    </div >
  );
};

export default App;
