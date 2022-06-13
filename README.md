# ClearVis API Documentation
## ClearVis EndPoint : http://34.142.244.51/

### Login
- URL : /login
- Method : POST
- request body (raw) :
  - email as String
  - password as String
```shell
{
    "email": "user@gmail.com",
    "password": "user123456"
}
```
- response success:
```shell
{
    "success": true,
    "data": {
        "name": "andi",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFuZGkiLCJlbWFpbCI6ImlyZmFuaW5hamFAZ21haWwuY29tIiwiaWF0IjoxNjU1MDg4ODc5LCJleHAiOjE2ODY2MjQ4Nzl9.bHl3H1sNYt46-3KwtzVWXcmfBElQRF0nNE8WQ3fKTbg"
    }
}
```
- response wrong:
```shell
{
    "success": false,
    "message": "Password salah"
}
```
## Register
- URL : /register
- Method : POST
- request body (raw) :
  - name as String
  - email as String
  - password as String
  - confirmPassword as String
```shell
{
    {
    "name": "user",
    "email": "user@gmail.com",
    "password": "2",
    "confirmPassword": "2"
}
}
```
- response success:
```shell
{
    "success": true,
    "message": "Berhasil mendaftar, silakan login"
}
```
- response wrong:
```shell
{
    "success": false,
    "message": "Password dan Konfirmasi Password harus sama"
}
```
## upload history
- URL : /history
- Method : POST
- Headers : Bearer (token)
- request body (form-data) :
  - userId as Int
  - image as File
  - status as String
- response success:
```shell
{
    "status": true
}
```
- response wrong:
```shell
{
    "success": false,
    "msg": "Status tidak ditemukan"
}
```
## get history
- URL : /history
- Method : GET
- Headers : Bearer (token)
- parameter :
  - userId as Int
- response success:
```shell
{
    "status": true,
    "data": [
        {
            "id": 2,
            "userId": "2",
            "status": "Normal",
            "image": "historyPhoto/1654601160995temp_file_.jpg",
            "createdAt": "2022-06-07T11:26:00.000Z",
            "updatedAt": "2022-06-07T11:26:00.000Z"
        }
    ]
}
```
## get artikels
- URL : /artikels
- Method : GET
- Headers : Bearer (token)
- response success:
```shell
{
    "success": true,
    "data": [
        {
            "url": "https://tulsaworld.com/lifestyles/health-med-fit/article_814971be-8474-581f-9340-6fd0da8d897b.html",
            "title": "Children and Cancer",
            "img": "https://www.bing.com/th?id=OVFT.SofcRzzDdO7S-1ilAbeWzC&pid=News&c=7&dpr=1&w=94&h=94",
            "postBy": "Tulsa World",
            "postDate": "1d"
        },
        {
            "url": "https://medicaldialogues.in/amp/ophthalmology/news/aqueous-humor-can-be-used-as-surrogate-for-retinoblastoma-diagnosis-study-suggests-94231",
            "title": "Aqueous humor can be used as surrogate for retinoblastoma …",
            "img": "https://www.bing.com/th?id=OVFT.bXytOcFs6Z-mWZgGniskQi&pid=News&c=7&dpr=1&w=94&h=94",
            "postBy": "Daily",
            "postDate": "3d"
        }
    ]
}
```
