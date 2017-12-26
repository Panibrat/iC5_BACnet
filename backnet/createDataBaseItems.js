var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iC5');

var AVs = require('../models/AV.js');
var BVs = require('../models/BV.js');

const bvList = [
    {
        title: 'BV10',
        description: 'Старт Установки',
        readOnly: false,
        value: false
    },
    {
        title: 'BV1',
        description: 'Работа ККБ',
        readOnly: true,
        value: true
    },
    {
        title: 'BV2',
        description: 'ТЭН',
        readOnly: true,
        value: true
    },
    {
        title: 'BV3',
        description: 'ТЭН',
        readOnly: true,
        value: true
    },
    {
        title: 'BV4',
        description: 'Насос Отопления',
        readOnly: true,
        value: false
    },
    {
        title: 'BV11',
        description: 'Теплый Пол',
        readOnly: false,
        value: true
    },
];
const avList = [
    {
        title: 'AV0',
        description: 'Температура в канале',
        status: 'norm',
        units: 'deg C',
        readOnly: true,
        value: 22.5
    },
    {
        title: 'AV1',
        description: 'Влажность в помещении',
        status: 'norm',
        units: '%',
        readOnly: true,
        value: 22.5
    },
    {
        title: 'AV2',
        description: 'Температура в помещении',
        status: 'norm',
        units: 'deg C',
        readOnly: true,
        value: 24.5
    },
    {
        title: 'AV3',
        description: 'Температура наружная',
        status: 'norm',
        units: 'deg C',
        readOnly: true,
        value: -5
    },
    {
        title: 'AV4',
        description: 'Температура Теплого Пола',
        status: 'norm',
        units: 'deg C',
        readOnly: true,
        value: 24
    },
    {
        title: 'AV12',
        description: 'Уставка ГВС',
        status: 'norm',
        units: 'deg C',
        readOnly: false,
        value: 55
    },
    {
        title: 'AV10',
        description: 'Клапан Тепло',
        status: 'norm',
        units: '%',
        readOnly: false,
        value: 100
    },
    {
        title: 'AV11',
        description: 'Клапан Холод',
        status: 'norm',
        units: '%',
        readOnly: false,
        value: 20
    }
];

avList.forEach(element => {
    AVs.create(element, function(err, av) {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE AV\n', av);
    });    
});

bvList.forEach(element => {
    BVs.create(element, function(err, bv) {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE AV\n', bv);
    });    
});

