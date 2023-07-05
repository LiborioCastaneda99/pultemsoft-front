import React from 'react';

const Error = ({mensaje}) => (
    <p className="alert alert-danger error text-center fw-bold">{mensaje}</p>
  );

export default Error;