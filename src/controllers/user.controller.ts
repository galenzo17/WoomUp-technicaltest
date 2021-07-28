import { Handler } from "express";
import { nanoid } from "nanoid";
import { getConnection,User } from "../db";
//Summary: La creacion de los endpoints y sus match se realiza de manera de lectura sobre escritura, para mantener la BD "viva" y se calculan los match en tiempo real
export const getMatchesById: Handler =(req , res)=>{
  const userFoundmatches = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();
  if (!userFoundmatches) return res.status(404).json({ msg: "Matches was not found" });
  const data: User[]=[]
  userFoundmatches.matches=updateMatchs(data,userFoundmatches)
  res.json(userFoundmatches.matches);
};

export const matchesTypesCountById:Handler =(req,res)=>{
  const userFound = getConnection()
    .get("users")
    .find({ id: req.params.id }).toJSON();
  if (!userFound) return res.status(404).json({ msg: "Matches was not found" });
  const needles=["Match de networking","Mentoría","Match interno de empresa","Mentoría interna de empresa"]
  let result={
    "networkingcount":0,
    "mentoriacount":0,
    "internocount":0,
    "mentoriainternacount":0,
  }
  const data: User[]=[]
  userFound.matches=updateMatchs(data,userFound)
  //TO_DO env variables para los tipos de matchs
  for(var i =0;i<userFound.matches.length;i++){
   console.log("matches es de tipo "+userFound.matches[i] )
    if(userFound.matches[i].matchtype===needles[0]){
      result.networkingcount++;
    }
    if(userFound.matches[i].matchtype===needles[1]){
      result.mentoriacount++;
    }
    if(userFound.matches[i].matchtype===needles[2]){
      result.internocount++;
    }
    if(userFound.matches[i].matchtype===needles[3]){
      result.mentoriainternacount++;
    }
  }
  res.json(result);
  /**TO-DO
   * Los needles deberian podrian ser un struct para desacoplar esta logica y ahorrarse posibles dolores de cabeza 
   */
};

export const matchesCount:Handler=(req,res)=>{
  const userFoundmatches = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();
  if (!userFoundmatches) return res.status(404).json({ msg: "Matches was not found" });
  const data: User[]=[]
  userFoundmatches.matches=updateMatchs(data,userFoundmatches)
  res.json(userFoundmatches.matches.length);
};

export const getUsers: Handler = (req, res) => {
  const data = getConnection().get("users").value();
  //se actualizan los matchs cada vez que se piden los datos para mantener flexible ese arreglo
  data.forEach(e=>{
    e.matches=updateMatchs(data,e)
  })
  return res.json(data);
};

export const createUser: Handler = (req, res) => {
  const data = getConnection().get("users").value();
  const { name, roles,enterprises,matches } = req.body;
  const newUsers = { name, roles, enterprises,matches,  id: nanoid() };
  
  try {
    newUsers.matches=[]
    const updatedmatches=updateMatchs(data,newUsers)
    newUsers.matches=updatedmatches
    getConnection().get("users").push(newUsers).write();
    res.json(newUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUser: Handler = (req, res) => {
  const userFound = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();

  if (!userFound) return res.status(404).json({ msg: "User was not found" });
  const data: User[]=[]
  userFound.matches=updateMatchs(data,userFound)
  res.json(userFound);
};

export const count: Handler = (req, res) => {
  const usersLength = getConnection().get("users").value().length;
  res.json(usersLength);
};

export const deleteUser: Handler = (req, res) => {
  const userFound = getConnection()
    .get("users")
    .find({ id: req.params.id })
    .value();

  if (!userFound) {
    return res.status(404).json({ msg: "User was not found" });
  }

  const deletedUser= getConnection()
    .get("users")
    .remove({ id: req.params.id })
    .write();

  res.json(deletedUser);
};

export const updateUser: Handler = (req, res) => {
  try {
    const userFound = getConnection()
      .get("users")
      .find({ id: req.params.id })
      .value();

    if (!userFound) {
      return res.status(404).json({ msg: "User was not found" });
    }

    const updatedUser = getConnection()
      .get("users")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//Helper
const updateMatchs=(data:User[],newUsers:User)=>{
  const matches: { matchtype: string; usernamematch: string; }[]=[]
  if(data.length>0){
    for(var i=0;i<data.length;i++){
      //Matches internos de empresa 2 usuarias misma empresa ambas con roles de guiada
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise===x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="guiada"&& newUsers.id!=data[i].id){
            newmatch.matchtype="Match interno de empresa"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
      //Matches de networking 2 usuarias guiadas diferente empresa o sin ella
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise!=x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="guiada"){
            newmatch.matchtype="Match de networking"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
      //Matches de mentoria 2 usuarias una de ellas con rol de mentora la otra con rol de guiada y distintas empresas
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise!=x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="mentora"){
            newmatch.matchtype="Mentoría"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
      //Matches de mentoria interna 2 usuarias una de ellas con rol de mentora la otra con rol de guiada y misma empresa
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise===x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="mentora"&&data[i].roles[0].role==="guiada"){
            newmatch.matchtype="Mentoría interna de empresa"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
    }
  }else{
    data = getConnection().get("users").value();
    for(var i=0;i<data.length;i++){
      //Matches internos de empresa 2 usuarias misma empresa ambas con roles de guiada
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise===x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="guiada"&& newUsers.id!=data[i].id){
            newmatch.matchtype="Match interno de empresa"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
      //Matches de networking 2 usuarias guiadas diferente empresa o sin ella
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise!=x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="guiada"){
            newmatch.matchtype="Match de networking"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
      //Matches de mentoria 2 usuarias una de ellas con rol de mentora la otra con rol de guiada y distintas empresas
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise!=x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="mentora"){
            newmatch.matchtype="Mentoría"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
      //Matches de mentoria interna 2 usuarias una de ellas con rol de mentora la otra con rol de guiada y misma empresa
      newUsers.enterprises.map(function(x: { enterprise: string; }){ 
        var result=data[i].enterprises.filter((a1: { enterprise: string; })=>a1.enterprise===x.enterprise );
        const newmatch={
          "matchtype":"",
          "usernamematch":""
        }
        if(result[0]) { 
          //x.enterprise=result[i].enterprise;
          if(newUsers.roles[0].role==="mentora"&&data[i].roles[0].role==="guiada"){
            newmatch.matchtype="Mentoría interna de empresa"
            newmatch.usernamematch=data[i].name
            matches.push(newmatch)
            
          }
        }
      })
    }
  }
  
  return matches
}