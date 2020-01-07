 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDbuXv96MCMQ2CvQjm-HDyCu5NypGs926g",
    authDomain: "lotteryregistry.firebaseapp.com",
    databaseURL: "https://lotteryregistry.firebaseio.com",
    projectId: "lotteryregistry",
    storageBucket: "lotteryregistry.appspot.com",
    messagingSenderId: "1022608917134",
    appId: "1:1022608917134:web:7c6f652160277337197fdf",
    measurementId: "G-N0F7M5RJ5P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
    // Get a reference to the database service
    var database = firebase.database();
    
    
        const button = document.getElementById('add');
        const form = document.getElementById('addForm');
        var date = document.getElementById('date'),
            day = document.getElementById('day'),
            number = document.getElementById('number'),
            search = document.getElementById('search'),
            searchBar = document.getElementById('searchBar'),
            searchResultShow = document.getElementById('searchResultShow'),
            success = document.querySelector('.success'),
            searchBlock = document.getElementById('searchBlock'),
            searchBlockBtn = document.getElementById('searchBlockBtn'),
            sortResult = document.getElementById('sortResult');
        var id = 2;
        var showData = document.getElementById('showData');
        button.addEventListener('click', function(e){
            e.preventDefault();
            var isAllFieldHasValue = validate(date.value,day.value,number.value);
            if(isAllFieldHasValue == true) {
                writeRegistyData(id,date.value,day.value,number.value);
            } else {
                alert('please fill all the fields');
            }
            
            //console.log(data);
        })
        function writeRegistyData(id, date, day, number) {
        firebase.database().ref('registry/' + id).set({
            date: date,
            day: day,
            number : number
        },function(err){
            if(err){
                console.log('failed')
            } else {
                success.classList.remove('hidden');
                console.log('data added success!')
                setTimeout(() => {
                    success.classList.add('hidden');
                },1000);
            }
        });
        }
        
        
        database.ref('registry').on('value', function(snapshot){
        // local data
        var data = snapshot.val();
        console.log('data',data);
        showData.innerHTML = '';
        data.map((val,index) => {
            console.log('map', val,index)
            //showData.innerHTML += val.number + '</br>';
        });
        var reducedData = data.reduce((prevIndex,currentIndex,index) => {
            id = index+1;
            console.log('index',index)
        });
       
        console.log('filtered data', id);
        search.addEventListener('click', function(e){
            e.preventDefault();
            var searchResult = searchNumber(searchBar.value, data);
            console.log('search', searchResult.length);
            searchResultShow.innerHTML = '';
            if(searchResult.length == 0) {
                alert('sorry no result');
            }else {
                searchResult.map((data, index) => {
                searchResultShow.innerHTML += `<b> ${index+1} </b>`+data.date + ' '+ data.day+ ' '+data.number+'</br>';
            })
            }
            
            
        })
        searchBlockBtn.addEventListener('click', function(e){
            e.preventDefault();
            var result = searchBlockfn(searchBlock.value,data);
            searchResultShow.innerHTML = '';
            if(result.length == 0) {
                alert('sorry no result');
            }else {
                result.map((data,index) => {
                 searchResultShow.innerHTML +=`<b> ${index+1} </b>` + '.' + data.date + ' '+ data.day+ ' '+data.number+'</br>';

                 // sort result 
                sortResult.onchange = function(){
                    
                    var day = this.value;
                    var sortDay = result.filter((val) => {
                        searchResultShow.innerHTML = '';
                        return val.day == day;
                    }).map((data, index) => {
                        console.log('value', data)
                        if(data == null) {
                            alert('no result found!')
                        } else {
                            searchResultShow.innerHTML +=`<b> ${index+1} </b>` + '.' + data.date + ' '+ data.day+ ' '+data.number+'</br>'; 
                        }                        
                    });
                    
                };
            })
            }
        })
        
        
    });
    
    
    function searchNumber(term,datas){
        
        var filter = datas.filter((data) => {
            console.log('suraj',data);
            return data.number.indexOf(term) > -1;
        });
        return filter;
        
    }
    function searchBlockfn(term,datas){
        
        var filter = datas.filter((data) => {
            //console.log('suraj',data);
            return data.number[0] == term;
        });
        return filter;
        
    }
    function validate(date,day,number){
        var isValid = false;
        if(date == '' || day == '' || number == '') {
            isValid = false;
        } else {
            isValid = true;
        }
        return isValid;
    }
        //