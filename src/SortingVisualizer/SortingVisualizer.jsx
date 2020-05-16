import React  from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort';
import {getbubbleSortAnimations} from '../SortingAlgorithms/bubbleSort';
import {getQuickSortAnimations} from '../SortingAlgorithms/quickSort';
import './SortingVisualizer.css';
import NavBar from '../Component/NavBar/NavBar';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#3399ff';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      sorting: false,
      sorted:false
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray=()=> {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array,
                  sorted:false});
  }

  mergeSort() {
    this.setState({sorting:true});
    const arrCopy=this.state.array.slice();
    const animations = getMergeSortAnimations(arrCopy);
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
    setTimeout(() => {
      this.setState({sorting:false,
                     sorted:true});
    }, animations.length * ANIMATION_SPEED_MS);
  }

  quickSort() {
    this.setState({sorting:true});
    const arrCopy=this.state.array.slice();
    const animations = getQuickSortAnimations(arrCopy);
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
    setTimeout(() => {
      this.setState({sorting:false,
        sorted:true});
    }, animations.length * ANIMATION_SPEED_MS);
  }

  bubbleSort() {
    this.setState({sorting:true});
    const arrCopy=this.state.array.slice();
    const animations = getbubbleSortAnimations(arrCopy);
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
    setTimeout(() => {
      this.setState({sorting:false,
        sorted:true});
    }, animations.length * ANIMATION_SPEED_MS);
  }


  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mySortedArray = getbubbleSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mySortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <React.Fragment>
        <NavBar 
          bubble ={() => this.bubbleSort()}
          merge ={() => this.mergeSort()} 
          quick ={() => this.quickSort()}
          reset ={()=> this.resetArray()}
          sorted={this.state.sorted}
          sorting={this.state.sorting}
          />
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
        </div>
      </React.Fragment>
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
