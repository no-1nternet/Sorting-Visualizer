import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort';
import {bubbleSortAlg, getbubbleSortAnimations} from '../SortingAlgorithms/bubbleSort';
import {quickSortHelper, getQuickSortAnimations} from '../SortingAlgorithms/quickSort';
import {heapSortAlg, getHeapSortAnimations} from '../SortingAlgorithms/heapSort';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations.length);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx,barTwoIdx,aniType] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if(aniType === 3){
        setTimeout(()=>{
          const color = PRIMARY_COLOR;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i*ANIMATION_SPEED_MS);
      } else if(aniType === 10 || aniType === 20 || aniType === 11 || aniType === 21){
        const color = (aniType === 10 || aniType === 20) ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(()=>{
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i*ANIMATION_SPEED_MS);
      }
    }
  }


  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      
      const [barOneIdx,barTwoIdx,aniType] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if(aniType === 0 || aniType === 1){
        const color = (aniType === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(()=>{
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i*ANIMATION_SPEED_MS);
        
      } else{
        setTimeout(()=>{
          const color = (aniType === 2) ? SECONDARY_COLOR : PRIMARY_COLOR;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          console.log("aa")
        }, i*ANIMATION_SPEED_MS);
      }
      
    }
  }


  bubbleSort() {
    const animations = getbubbleSortAnimations(this.state.array);
    // console.log(animations);
    console.log(animations.length);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      
      const [barOneIdx,barTwoIdx,aniType] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if(aniType !== 2){
        const color = (aniType === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(()=>{
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i*ANIMATION_SPEED_MS);
        
      } else{
        setTimeout(()=>{
          const color = PRIMARY_COLOR;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i*ANIMATION_SPEED_MS);
      }
      
    }
    console.log("gogogo!!")
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mySortedArray = heapSortAlg(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mySortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
          <p className = "iter-count">0</p>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
