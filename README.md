## Sub-service for [NhacCuaTui Clone](https://github.com/tquann286/nhaccuatui-clone)

Due to restrictions imposed by nhaccuatui developers, requests are blocked unless they come from the referer https://beta.nhaccuatui.com/. Unfortunately, we cannot alter this on the client side (frontend) due to technical limitations ([Details](https://stackoverflow.com/questions/33143776/ajax-request-refused-to-set-unsafe-header)). 

To overcome this issue, I've developed a backend service that modifies the referer from server requests.
