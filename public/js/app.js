

const getLocation = () => {

    let value = document.getElementById('location').value;
    let url = `/weather?loc=${value}`;
    fetch(url).then((response) => {
        response.json().then((data) => {
          
            if (data.error) {
                document.getElementById('temp').innerText = data.error;
            }
            else {
            
                document.getElementById('temp').innerText = "Temp:"+data.Temp;
                document.getElementById('place').innerText="Location:"+data.place_name;
        }


        })
    })
}