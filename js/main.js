/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* global AudioContext, SoundMeter */

'use strict';

const instantMeter = document.querySelector('#instant meter');
const slowMeter = document.querySelector('#slow meter');
const clipMeter = document.querySelector('#clip meter');

const instantValueDisplay = document.querySelector('#instant .value');
const slowValueDisplay = document.querySelector('#slow .value');
const clipValueDisplay = document.querySelector('#clip .value');

try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  window.audioContext = new AudioContext();
} catch (e) {
  alert('Web Audio API not supported.');
}

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: true,
  video: false
};

function handleSuccess(stream) {
  // Put variables in global scope to make them available to the
  // browser console.
  window.stream = stream;
  const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
  soundMeter.connectToSource(stream, function(e) {
    if (e) {
      alert(e);
      return;
    }
    setInterval(() => {
      console.log('Sound Level:', soundMeter.instant);
      instantMeter.value = instantValueDisplay.innerText = soundMeter.instant.toFixed(2);
    }, 200);
  });
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

// One-liner to resume playback when user interacted with the page.
document.querySelector('button').addEventListener('click', function() {
  window.audioContext.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});

// Registering the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('js/sw.js')
    .then(reg => {
      console.log('Registered!', reg);
    }).catch(err => {
      console.log('Registration failed: ', err);
    });
  });
}