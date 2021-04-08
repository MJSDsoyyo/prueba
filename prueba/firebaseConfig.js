
$(() => {

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyDyOfAPOhu8Njz5kRcqTwV8zTKaNIwb3oE",
        authDomain: "buscaminas-3f23e.firebaseapp.com",
        projectId: "buscaminas-3f23e",
        storageBucket: "buscaminas-3f23e.appspot.com",
        messagingSenderId: "94992731654",
        appId: "1:94992731654:web:991b6be3080eef5628bd87",
        measurementId: "G-CH4VBT8HFF"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    /*firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });*/

    $("#boton").on("click", function (e) {
       
        e.preventDefault();
        console.log("hola")
        const provider = new firebase.auth.GoogleAuthProvider();
 
        firebase.auth().signInWithRedirect(provider)
          .then(result => console.log(`${result.user.email} ha iniciado sesión`))
          .catch(error => console.log(`${error.code}:  ${error.message}`))
            

    });
    $("#enviar").on("click", function (e) {
        var email = $("#email").val();
        var password = $("#password").val();

        var user = [];
        e.preventDefault();
        var db = firebase.firestore();
        db.collection('usuarios').get()
            .then(snapshot => {
                // console.log(snapshot.docs[0].data());
                user = snapshot.docs;
                var igual = false;
                console.log(user.length);
                for (var i = 0; i < user.length; i++) {
                    console.log(user[i].data().Email + "-" + $("#email").val());
                    if (user[i].data().Email == $("#email").val()) {
                        igual = true;
                        break;
                    } else {
                        igual = false;
                    }
                }
                if (igual == true) {
                    $("#form1").append("<small class='incorrecto'>El correo introducido ya está en uso</small>")
                } else {
                    db.collection("usuarios").doc($("#email").val()).set({
                        Email: $("#email").val(),
                        Nick: $("#nick").val(),
                        Password: $("#password").val()
                    })
                        .then((docRef) => {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });

                }
            })
            .catch(err => console.log(err));
    })
    $("#enviar2").on("click", function (e) {
        e.preventDefault();
        var user = [];
        var db = firebase.firestore();
        var indentificado = false;
        db.collection('usuarios').get()
            .then(snapshot => {
                // console.log(snapshot.docs[0].data());
                user = snapshot.docs;
                for (let i = 0; i < user.length; i++) {
                    if (user[i].id == $("#email2").val()) {
                        console.log(user[i].data().Password);
                        if (user[i].data().Password != $("#password2").val()) {
                            indentificado = false;
                        } else {
                            indentificado = true;
                            break;
                        }
                    } else {
                        indentificado = false;
                    }
                }
                if (indentificado) {
                    $("#form2").append("<small class='correcto'>Conectado</small>")
                } else {
                    $("#form2").append("<small class='incorrecto'>El correo introducido y/o la contraseña son incorrectas</small>")
                }
            })
            .catch(err => console.log(err));

    })
})
