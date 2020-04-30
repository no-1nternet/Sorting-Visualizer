import {swap} from '../Shared/Util';

var arrLen
/* to create MAX  array */  
function heap_root(arr, i, animations) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
    if (left < arrLen && arr[left] > arr[max]) {
        max = left;
        animations.push([left,max, 0]); // show 
        animations.push([left,max, 1]); // hide 
    }
    if (right < arrLen && arr[right] > arr[max])     {
        max = right;
        animations.push([right,max, 0]); // show 
        animations.push([right,max, 1]); // hide 
    }
    if (max !== i) {
        swap(arr, i, max);
        animations.push([i,max, 2]); // show 
        animations.push([i,max, 3]); // hide 
        heap_root(arr, max, animations);
    }
}

export function heapSortAlg(arr, animations) {
    arrLen = arr.length;
    for (var i = Math.floor(arrLen / 2); i >= 0; i --)      {
        heap_root(arr, i, animations);
      }

    for (i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        animations.push([0,i, 2]); // show 
        animations.push([0,i, 3]); // hide 
        arrLen--;
        heap_root(arr, 0, animations);
    }
    return arr;
}

export function getHeapSortAnimations(arr) {
    const animations = [];
    if (arr.length <= 1) return arr;
    heapSortAlg(arr, animations);
    return animations;
  }