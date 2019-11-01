const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {validationResult } = require('express-validator');

const User = require('../model/usuario');

exports.chat = (req,res,next)=>{
    const usuario = req.session.user.nome;
    res.render('index',{
      usuario:usuario
    });

}

exports.getLogin = (req,res,next)=>{
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('login',{
    errorMessage:message
  })
}

exports.getNovoUsuarioLogin = (req,res,next)=>{
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('criarUsuario',{
    errorMessage:message
  })
}

exports.postNovoUsuarioLogin = (req,res,next)=>{
  const nome = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array());
   return res.status(422).render('criarUsuario',{
     errorMessage:errors.array() [0].msg
   });
  }
  User.findOne({email: email})
  .then(UsuarioDocumento =>{
     if(UsuarioDocumento){
       req.flash('error','Email ja existente tente outro por favor');
       return res.redirect('/criarUsuario');
     }
     return bcrypt
     .hash(password,12)
     .then(hashedPassword =>{
        const user = new User({
          email:email,
          password:hashedPassword,
          nome:nome
        });
        return user.save();
     })
     .then(result =>{
       res.redirect('/login');
     });
    })
    .catch(err =>{
        console.log(err);
    });
}


exports.postAcessarLogin = (req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({email:email})
  .then(user =>{
    if(!user){
      return res.redirect('/login');
    }
    bcrypt.compare(password, user.password)
    .then(result =>{
      if(result){
        req.session.isLoggedIn = true;
        req.session.user = user
        return req.session.save(err =>{
         console.log(err);
         res.redirect('/');
        })
      }else{
        return res.redirect('/login');
      }
    })
    .catch(err =>{
      console.log(err);
      res.redirect('/login')
    });

  });
}


exports.postDeslogar = (req,res,next)=>{
  req.session.destroy(()=>{
    console.log('logoff');
      res.redirect('/login');
  });
}