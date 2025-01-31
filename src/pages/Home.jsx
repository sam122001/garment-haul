import React, { useEffect } from 'react'
import axios from 'axios'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import CategoryCard from '../components/Category_card/CategoryCard';
import BannerData from '../Helpers/HomePageData';
import Carousel from '../components/Carousel/Carousel'

function Home() {
  let authToken = localStorage.getItem('Authorization')

    
  return (
    <>
    <Container maxWidth='xl' style={{ display: 'flex', justifyContent: "center", padding: 0, flexDirection: "column", marginBottom: 50}}>
        <Box padding={1}>
            <Carousel />
        </Box>
        <Typography variant='h3' sx={{ textAlign: 'center', marginTop: 10, color: '#1976d2', fontWeight: 'bold' }}>Categories</Typography>
        <Container maxWidth='xl' style={{ marginTop: 90, display: "flex", justifyContent: 'center', flexGrow: 1, flexWrap: 'wrap', gap: 20, }}>
            {
                BannerData.map(data => (
                    <CategoryCard data={data} key={data.img} />
                ))
            }
        </Container>
    </Container >
</ >
  )
}

export default Home