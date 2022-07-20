import React from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

const RelationshipSpaceToken = () => {
  const location = useLocation();
  console.log(location)
  return (
    <divn>{location.pathname}</divn>
  )
}

export default RelationshipSpaceToken