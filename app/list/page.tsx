"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Page() {

  const [patientData, setPatientData] = useState(null);
  const apiUrl = 'http://localhost:8080/fhir/Patient';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setPatientData(data);
        } else {
          console.error('Failed to fetch patient data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during patient data fetching:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (



    <div className='flex flex-col items-center justify-center h-screen bg-white '>

      <div className='flex flex-row justify-between w-[650px] border-black mb-8'>
      <div className='flex'>
        <img src='https://cms.medblocks.com/assets/2e0e885d-99dc-445f-8a89-fd910d3f7db8' className='w-12 h-12' />
        <div className='ml-4 pt-3 text-[20px] font-bold'>MedBlocks</div>
        </div>
      <div className='flex w-[300px] rounded-xl bg-gradient-to-l from-violet-600 via-violet-400 to-violet-300  justify-center items-center'>
        Patient Details
      </div>
      </div>
    <TableContainer component={Paper} className='w-[700px] rounded-3xl'>
      <Table sx={{ minWidth: 650 }} aria-label="simple className='  bg-violet-200 border-r-violet-700 border-b-violet-700 border-[1px]' table z-[9999]">
        <TableHead className=' h-20 bg-gradient-to-l from-violet-600 via-violet-400 to-violet-300 pd-12'>
          <TableRow >
            <TableCell className='items-center pr-20' align="right">Full name</TableCell>
            <TableCell className=' items-center pr-8'  align="right" >Gender</TableCell>
            <TableCell className=' items-center pr-8' align="right">Contact Number</TableCell>
            <TableCell className=' items-center pr-8' align="right">Date of birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientData && (patientData as any).entry.map((entry: { resource: any; }) => {
            const patient = entry.resource;
            const fullName = patient.name ? patient.name[0].given.join(' ') + ' ' + patient.name[0].family : '';
            const birthDate = patient.birthDate || '';
            const gender = patient.gender || '';
            const phoneNumber = patient.telecom ? patient.telecom[0].value : '';
            
            return (

              
              <TableRow className='bg-violet-200 border-black ' key={fullName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                
                  <TableCell className='  bg-violet-200 border-r-violet-700 border-b-violet-700 border-[1px] hover:bg-violet-300 transition-all duration-300"'  component="th" scope="row">
                  {fullName}
                </TableCell>
                
                
                <TableCell className='  bg-violet-200 border-r-violet-700 border-b-violet-700 border-[1px]
                hover:bg-violet-300 transition-all duration-300"'  align="right">{gender}</TableCell>
                <TableCell className='  bg-violet-200 border-r-violet-700 border-b-violet-700 border-[1px] hover:bg-violet-300 transition-all duration-300"' align="right" >{phoneNumber}</TableCell>
                <TableCell className='  bg-violet-200 border-r-violet-700 border-b-violet-700 border-[1px] hover:bg-violet-300 transition-all duration-300"' align="right">{birthDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
