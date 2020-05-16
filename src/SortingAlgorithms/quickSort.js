import {swap} from '../Shared/Util';

function quickSortHelper(arr){
     const animations = []
     return quickSort(arr,0,arr.length-1,animations);
};


function quickSort(arr, left, right,animations){
    var index;

    if (arr.length > 1) {
        index = partition(arr, left, right, animations);
        if (left < index - 1) {
            quickSort(arr, left, index - 1, animations);
        }
        if (index < right) {
            quickSort(arr, index, right, animations);
        }
    }
    return animations;
};


export function getQuickSortAnimations(arr) {
    if (arr.length <= 1) return arr;
    const animations = quickSortHelper(arr);
    return animations;
  }



function partition(arr, left, right, animations) {
    var pivot   = arr[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;

    animations.push([i, j, 10]);        // show left & right
    animations.push([i, j, 11]);        //hide
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
            animations.push([i, j, 20]); //show new left
            animations.push([i, j, 21]); //hide
        }
        while (arr[j] > pivot) {
            j--;
            animations.push([i, j, 20]); //show new right
            animations.push([i, j, 21]); //hide
        }
        if (i <= j) {
            animations.push([i, j, 3]); //show switch
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}