const array = [
    {   //title: 'AV12',
        description: '',
        status: 'norm',
        units: 'deg C',
    },
    
    {   //title: 'AV13',
        description: '',
        status: 'norm',
        units: 'deg C',
    },
    {   //title: 'AV16',
        description: '',
        status: 'norm',
        units: 'deg C',
    },

];
const covertAVforLoop = (dbResult) => {
    const hasTitleArray = dbResult.filter((item) => {return item.title});
    const pointsAVArray = hasTitleArray.map((item) => {
        if(item.title.slice(0,2) == 'AV') {
            return Number(item.title.slice(2));
        }
        return;
    });    
    const uniquePointsArray = pointsAVArray.filter((number, index, array) => {
        return array.indexOf(number) === index;
    });
    return uniquePointsArray;
};

console.log(covertAVforLoop(array)); 