const fs = require('fs');

const { createCanvas, loadImage } = require('canvas')

const width = 500
const height = 500
const midWidth = width / 2

const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')


async function convertToArt(num) {

    var image = await loadImage('./demo-card-empty.png')
    ctx.drawImage(image, 0, 0, width, height)

    ctx.font = 'bold 60pt Nimbus Mono PS'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0.33, 'hsla(200, 100%, 75%, 1)')
    gradient.addColorStop(0.66, 'hsla(300, 100%, 75%, 1)')
    ctx.fillStyle = gradient

    const paddingTop = 70
    const lineHeight = 90

    const text = `KrypC NFT Edition ${num}`
    const lines = text.split(' ')

    lines.forEach((line, i) => {
    ctx.fillText(line, midWidth, paddingTop + lineHeight * i)
    })

    ctx.fillStyle = 'hsla(300, 100%, 75%, .75)'
    ctx.font = 'bold 30pt monospace'


    const buffer = canvas.toBuffer('image/png')
    return buffer
}

module.exports = {convertToArt}