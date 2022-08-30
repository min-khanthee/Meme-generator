import React, { useState, useEffect } from 'react'
import memesData from '../memesData.js'

export default function Meme() {
  // const [memeImage, setMemeImage] = useState('')

  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  })

  const [allMemeImages, setAllMemeImages] = useState(memesData)

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => {
        console.log(`this is ${data}`)
        setAllMemeImages(data.data.memes)
      })
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }))
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length)
    const url = allMemeImages[randomNumber].url

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      }
    })
  }

  return (
    <main>
      <div className='form'>
        <input
          type='text'
          placeholder='Top text'
          className='form--input'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Bottom text'
          className='form--input'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className='form--button' onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} className='meme--image' />
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
    </main>
  )
}
