export default function ({ $axios, redirect, $cookies }) {
    /* $axios.onError(error => {
         if(error.response.status === 500) {
           redirect('/sorry')
         }
       }) 
    if (process.browser) {
      const token = $cookies.get('token')
      $axios.setHeader('Authorization', `Bearer ${token}`)
      // console.log(token)
  
      $axios.onError((error) => {
        if (error.response.status === 401) {
          redirect('/admin')
        }
      })
    }
    if (process.server) {
      const token = $cookies.get('token')
  
      $axios.setHeader('Authorization', `Bearer ${token}`)
      // console.log(token)
  
      $axios.onError((error) => {
        if (error.response.status === 401) {
          redirect('/admin')
        }
      })
    } */
   
  

    $axios.onRequest((config) => {
      const token = JSON.parse(localStorage.getItem("token"))
      config.headers.Authorization = `Bearer ${token}`
      return config
    })  
  
      $axios.onError((error) => {
        if (error.response.status === 401) {
          redirect('/signin')
        }
      })
    
  }
  