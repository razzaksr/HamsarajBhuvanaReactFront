import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import { findingId, inserting, uploading } from "./API";
import { useParams } from "react-router-dom";
import CreditScoreIcon from '@mui/icons-material/CreditScore';


export const Edit=()=>{
    const{id}=useParams()
    const[corp,setCorp]=useState({})

    const callingRead=async()=>{
        const t = await findingId(id)
        setCorp(t.data)
    }

    useEffect(()=>{
        callingRead()
    },[])

    const heyThere=(buvana)=>{
        const{name,value}=buvana.target
        setCorp((mas)=>{
            return{
                ...mas,
                [name]:value
            }
        })
    }

    const submitting=async()=>{
        const res= await uploading(corp)
        alert(JSON.stringify(res.data))
        reset()
    }

    const reset=()=>{
        setCorp(()=>{
            return{
                "org":"",
                "nature":"Select Any Nature",
                "place":"",
                "opennings":"",
                "basic":0.0,
                "ratings":0.0,
                "employees":0
            }
        })
    }

    return(
        <>
            <div className="mt-2 container-fluid">
                <h1 className="text-center display-6 text-primary">Corporate MOE</h1>
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-9 col-sm-12 shadow rounded p-4 mb-4">
                        <TextField
                            required
                            id="outlined-required"
                            label="Organisation Name"
                            defaultValue=""
                            onChange={heyThere}
                            className="mb-3 form-control"
                            name="org"
                            value={corp.org}
                        />
                        <InputLabel id="natlab">Nature</InputLabel>
                        <Select
                            labelId="natlab"
                            onChange={heyThere}
                            id="demo-simple-select-helper"
                            className="mb-3 form-select"
                            name="nature"
                            value={corp.nature}
                            label="Nature">

                            <MenuItem value="Select Any Nature"><em>Select Any Nature</em></MenuItem>
                            <MenuItem value="Product">Product</MenuItem>
                            <MenuItem value="Service">Service</MenuItem>
                            <MenuItem value="ITES">ITES</MenuItem>
                        </Select>
                        <TextField
                            required
                            value={corp.opennings}
                            onChange={heyThere}
                            id="outlined-required"
                            label="Organisation Opennings"
                            defaultValue=""
                            className="mb-3 form-control"
                            name="opennings"
                        />
                        <TextField
                            required
                            value={corp.place}
                            onChange={heyThere}
                            id="outlined-required"
                            label="Organisation Place"
                            defaultValue=""
                            className="mb-3 form-control"
                            name="place"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            onChange={heyThere}
                            label="Organisation Employees count"
                            defaultValue=""
                            value={corp.employees}
                            className="mb-3 form-control"
                            name="employees"
                        />
                        <InputLabel htmlFor="basicsal">Basic Salary</InputLabel>
                        <OutlinedInput
                            id="basicsal"
                            value={corp.basic}
                            onChange={heyThere}
                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                            label="Basic Salary"
                            className="mb-3 form-control"
                            name="basic"
                        />
                        <InputLabel htmlFor="rate">Rating</InputLabel>
                        <OutlinedInput
                            id="rate"
                            startAdornment={<InputAdornment position="start">★</InputAdornment>}
                            label="Ratings"
                            onChange={heyThere}
                            value={corp.ratings}
                            name="ratings"
                            className="mb-3 form-control"
                        />
                        <div className="row justify-content-around">
                            <Button className="col-3" variant="outlined" color="primary" onClick={submitting}>
                                <CreditScoreIcon/>
                            </Button>
                            <Button className="col-3" variant="outlined" color="error" onClick={reset}>
                                <DoDisturbAltIcon/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}