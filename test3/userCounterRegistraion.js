//link http://svitex.ru/api/visitors/js/userCounterRegistraion.js
function userCounterRegistraion() {
    let userInfo, userIp = 'UnknownIp', latPos, lonPos, userCity = 'Unknown City', userDevice = navigator.userAgent, winloc = window.location;  
    let currentPagePath = winloc.pathname, host = winloc.host, protocol = winloc.protocol;
    var pathParts = host.split(':');
    let currentServerName = pathParts[0], currentPortName = pathParts[1];
    function ipAndCityGet() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://ip-api.com/json/`,
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        const responseCity = response.city, responseIp = response.query;
                        resolve({ responseCity, responseIp });
                    } else {
                        reject(new Error('connectFalse'));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(new Error('ajaxFalse'));
                }
            });
        });
    }

    function getCityFromGeolocation() {
        return new Promise((resolve, reject) => {
            if (protocol == 'https://' && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        latPos = position.coords.latitude;
                        lonPos = position.coords.longitude;
                        $.ajax({
                            url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latPos}&lon=${lonPos}&zoom=10`,
                            method: 'GET',
                            success: function(response) {
                                if (response.address) {
                                    var city = response.address.county;
                                    resolve(city);
                                } else {
                                    reject(new Error('City not found'));
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                reject(new Error('AJAX error: ' + textStatus));
                            }
                        });
                    },
                    function(error) {
                        reject(new Error('Geolocation error: ' + error.message));
                    }
                );
            } else {
                reject(new Error('Geolocation not supported or protocol is not https'));
            }
        });
    }

    async function getFunc() {
        try {
            const { responseCity, responseIp } = await ipAndCityGet();
            if (responseCity != null && responseIp != null) {
                userCity = responseCity;
                userIp = responseIp;
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
        try {
            userCity = await getCityFromGeolocation();
        } catch (error) {
            console.error('Error:', error.message);
        }
        userInfo = {
            server: currentServerName,
            page: currentPagePath,
            ip: userIp,
            city: userCity,
            device: userDevice
        };
        let urlPost = 'http://svitex.ru/api/visitors/registate.php';
        if(protocol == 'https:'){
            urlPost = 'https://svitex.ru/api/visitors/registate.php';
        }
        $.ajax({
            url: urlPost,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({data: userInfo}),
            success: function(response) {
                console.log(response.result);
            }
        });
    }

    getFunc();
}
userCounterRegistraion();
