
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../state/AuthContext'
import { Grid, TextField, MenuItem, Button, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material'

export default function Search() {
  const [list, setList] = useState([])
  const [filters, setFilters] = useState({ minPrice:'', maxPrice:'', bedrooms:'', suburb:'', type:'' })
  const { token } = useAuth()

  async function load() {
    const params = {}
    if (filters.minPrice) params.minPrice = filters.minPrice
    if (filters.maxPrice) params.maxPrice = filters.maxPrice
    if (filters.bedrooms) params.bedrooms = filters.bedrooms
    if (filters.suburb) params.suburb = filters.suburb
    if (filters.type) params.type = filters.type
    const { data } = await api.get('/properties', { params })
    setList(data)
  }

  useEffect(() => { load() }, [])

  async function toggleFavorite(id) {
    if (!token) return alert('Login to save favorites')
    await api.post(`/favorites/${id}`)
    alert('Toggled favorite')
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Search Properties</Typography>
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={6} md={2}><TextField fullWidth label="Min Price" value={filters.minPrice} onChange={e=>setFilters({...filters, minPrice:e.target.value})} /></Grid>
        <Grid item xs={12} sm={6} md={2}><TextField fullWidth label="Max Price" value={filters.maxPrice} onChange={e=>setFilters({...filters, maxPrice:e.target.value})} /></Grid>
        <Grid item xs={12} sm={6} md={2}><TextField fullWidth label="Bedrooms ≥" value={filters.bedrooms} onChange={e=>setFilters({...filters, bedrooms:e.target.value})} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Suburb" value={filters.suburb} onChange={e=>setFilters({...filters, suburb:e.target.value})} /></Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth select label="Type" value={filters.type} onChange={e=>setFilters({...filters, type:e.target.value})}>
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="Sale">Sale</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}><Button variant="contained" onClick={load}>Search</Button></Grid>
      </Grid>

      <Grid container spacing={2}>
        {list.map(p => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <Card>
              <Link to={`/properties/${p.id}`} style={{ textDecoration:'none', color:'inherit' }}>
                <CardMedia component="img" height="160" image={(p.imageUrls && p.imageUrls[0]) || 'https://placehold.co/800x450'} alt="" />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{p.title}</Typography>
                  <Typography variant="body2">{p.address}</Typography>
                  <Typography variant="subtitle1">PKR {p.price.toLocaleString()}</Typography>
                  <Typography variant="body2">{p.bedrooms} bd • {p.bathrooms} ba • {p.carSpots} car</Typography>
                </CardContent>
              </Link>
              <CardActions>
                <Button onClick={()=>toggleFavorite(p.id)}>★ Favorite</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
