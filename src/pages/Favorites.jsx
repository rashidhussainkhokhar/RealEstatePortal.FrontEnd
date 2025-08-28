
import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material'

export default function Favorites() {
  const [list, setList] = useState([])
  useEffect(() => {
    async function load() {
      const { data } = await api.get('/favorites')
      setList(data)
    }
    load()
  }, [])

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>My Favorites</Typography>
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
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
