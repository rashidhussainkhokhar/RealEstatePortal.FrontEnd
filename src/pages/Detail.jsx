
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { Typography, Grid, Paper } from '@mui/material'

export default function Detail() {
  const { id } = useParams()
  const [p, setP] = useState(null)

  useEffect(() => {
    async function load() {
      const { data } = await api.get(`/properties/${id}`)
      setP(data)
    }
    load()
  }, [id])

  if (!p) return <div>Loading...</div>
  return (
    <div>
      <Typography variant="h5" gutterBottom>{p.title}</Typography>
      <Typography variant="subtitle1">{p.address}</Typography>
      <Typography variant="h6" sx={{ my:1 }}>PKR {p.price?.toLocaleString()}</Typography>
      <Grid container spacing={1} sx={{ my:1 }}>
        {p.imageUrls?.map((u,i)=>(
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ overflow:'hidden' }}>
              <img src={u} alt="" style={{ width:'100%', display:'block' }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ my:2 }}>{p.description}</Typography>
      <Typography variant="body2">{p.bedrooms} bd • {p.bathrooms} ba • {p.carSpots} car • {p.listingType}</Typography>
    </div>
  )
}
