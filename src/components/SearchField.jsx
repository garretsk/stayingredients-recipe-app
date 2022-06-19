import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import SpeechInputPopUp from "./SpeechInputPopUp";

export default function SearchField(props) {
  const {
    transcript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  function toggleListening() {
    if(listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
    else {
      SpeechRecognition.startListening();
    }
  }
  
  useEffect(() => {
    if(transcript.length > 0) {
      props.handleSpeechInput(transcript);
      resetTranscript();
    }
  });

  useEffect(() => {
    return () => {
      if(listening) {
        SpeechRecognition.stopListening();
        resetTranscript();
      }
    };
  });

  let placeholder;
  if(undefined === props.placeholder) {
    placeholder = "Search";
  }
  else {
    placeholder = props.placeholder;
  }

  let voiceButton;
  if(listening) {
    voiceButton = <button className="btn mt-sm-4 mx-1" onClick={toggleListening}><i style={{color: "#0096ff"}} className="fas fa-microphone-alt fa-2x"></i></button>;
  }
  else{
    voiceButton = <button className="btn mt-sm-4 mx-1" onClick={toggleListening}><i style={{color: "#00008b"}} className="fas fa-microphone-alt fa-2x"></i></button>;
  }

  return(
    <div className="form-inline justify-content-center">
      <form style={{display: "inline"}} className="form-inline justify-content-center my-2 my-lg-0" onSubmit={props.handleSubmit}>
        <input className="form-control mt-sm-4 mr-1" type="text" value={props.query} onChange={props.handleChange} placeholder={placeholder} aria-label="Search"/>
        <button className="btn btn-outline mt-sm-4" type="submit">Search</button>
      </form>
      {SpeechRecognition.browserSupportsSpeechRecognition() && voiceButton}
      {listening && <SpeechInputPopUp handleClose={toggleListening}/>}
    </div>
  );
}