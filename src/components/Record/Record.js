import React, { useState, useEffect, useMemo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import AlbumIcon from '@material-ui/icons/Album';
import StopIcon from '@material-ui/icons/Stop';
import MicRecorder from 'mic-recorder-to-mp3';
import "./Record.scss";
  
function Record(props) {

  //initialize recorder
  const Mp3Recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);

  //initialize state
  const [state, setState] = useState({
    email: ''
  });

  //default settings for recorder
  const [settings, setSettings] = useState({
      isRecording: false, 
      blobURL: '',
      isBlocked: false
  });

  useEffect(() => {
        //it will check onload if mic is allow to use
        navigator.getUserMedia({ audio: true },
          () => {
              console.log('Permission Granted');
              setSettings({ ...settings, isBlocked: false });
          },
          () => {
              console.log('Permission Denied');
              setSettings({ ...settings, isBlocked: true })
          },
        );
  }, []);

  //handler start recording
  const start = () => {
    if (settings.isBlocked) {
      console.log('Permission Denied');
    } else {
      console.log(state.email);
      Mp3Recorder
        .start()
        .then(() => {
          setSettings({ ...settings, isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  //handler stop recording
  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setSettings({ ...settings, blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  //handler email value
  const handleValues = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className="Record">
      <h1>Record Audio</h1>
      <Card>
        <CardContent>
          <div className="email">
            <TextField required name="email" label="Email" onChange={handleValues} />
          </div>
          <div className="buttons">
            <button onClick={start} title="Record" disabled={settings.isRecording || !state.email}><AlbumIcon color="primary" /></button>
            <button onClick={stop} title="Record" disabled={!settings.isRecording}><StopIcon color="primary" /></button>
          </div>
          <div className="player">
            <audio src={settings.blobURL} controls="controls" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Record;