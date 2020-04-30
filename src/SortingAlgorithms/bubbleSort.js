export function bubbleSortAlg(arr, animations){
    let flag = false;
    while(!flag){
        flag = true;
        for(var i =0; i<arr.length-1;i++){
            animations.push([i, i+1, 0]); // show comparing pair
            if(arr[i]>arr[i+1]){
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                flag = false;
                animations.push([i, i+1, 2]); // show comparing pair
            }else{
                animations.push([i, i+1, 1]); // show comparing pair
            }
                
        }
    }
    return arr;

};

export function getbubbleSortAnimations(arr) {
    const animations = [];
    if (arr.length <= 1) return arr;
    bubbleSortAlg(arr, animations);
    return animations;
  }