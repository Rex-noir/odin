function fibs(number){
    let arr = [0,1];
    for(let i = 2; i <= number; i++){
        arr.push(arr[i-1]+arr[i-2])
    }
    return arr.slice(0,arr.length-1);
}

function fibsRec(number,arr = [0,1]){
    if(arr.length>=number){
        return;
    }
    let firstnumber = arr[arr.length-1];
    let secondnumber = arr[arr.length-2];
    arr.push(firstnumber+secondnumber);
    fibsRec(number,arr);
    return arr;
}

function mergeSort(arr,l, h){
    if(l<h){
        let mid = Math.floor((l+h)/2);4
        mergeSort(arr, l, mid);
        mergeSort(arr, mid+1, h);
        merge(arr, l, mid, h);
    }
    return arr;
}

function merge(arr,l, mid, h){
    let leftside = arr.slice(l, mid+1);
    let rightsdie = arr.slice(mid+1, h+1);
    let i = 0;
    let j = 0;
    let k = l;

    while(i<leftside.length && j< rightsdie.length){
        if(leftside[i]<= rightsdie[j]){
            arr[k]= leftside[i];
            i++;
        }
        else{
            arr[k] = rightsdie[j];
            j++;
        }
        k++;
    }
    
    while(i<leftside.length){
        arr[k]= leftside[i]
        i++;
        k++;
    }
    while(j<rightsdie.length){
        arr[k] = rightsdie[j];
        j++;
        k++;
    }
}
let arr = [3, 2, 1, 13, 8, 5, 0, 1];
console.log(mergeSort(arr,0, arr.length-1));