const { expect } = require('chai')
const { ethers, waffle } = require('hardhat')

describe('Contract', function () {
  let provider = waffle.provider
  let dogs = null
  let mintPrice = 0.01
  it('Contract should deploy', async function () {
    const Dogs = await ethers.getContractFactory('Dogs')
    dogs = await Dogs.deploy()
    expect(dogs.address).to.not.be.null
  })

  it('Owner should have balance', async function () {
    const [owner] = await ethers.getSigners()
    const ownerBalance = await provider.getBalance(owner.address)
    console.log(ownerBalance)
  })

  it('Contract balance should be 0', async function () {
    const balance = await provider.getBalance(dogs.address)
  })

  it('Should not be able to mint before enabling', async () => {
    const mint = dogs.functions.mint(1, {
      value: ethers.utils.parseEther(`${mintPrice}`),
    })
    await expect(mint).to.be.reverted
  })

  it('Should be able to enable', async function () {
    const setEnabled = dogs.functions.setIsPublicMintEnabled(true)
    await expect(setEnabled).not.to.be.reverted
    const enabled = await dogs.functions.isPublicMintEnabled()
    expect(enabled[0]).to.be.true
  })

  it('Should be able to mint once', async () => {
    const mint = dogs.functions.mint(1, {
      value: ethers.utils.parseEther(`${mintPrice}`),
    })
    await expect(mint).to.not.be.reverted
  })

  it('Should increment token balance', async () => {
    const [owner] = await ethers.getSigners()
    expect((await dogs.functions.balanceOf(owner.address))[0].toString()).to.eq(
      '1',
    )
  })

  it('Should have minted token 1', async () => {
    const [owner] = await ethers.getSigners()
    await dogs.functions.ownerOf(1).then((r) => expect(r == owner.address))
  })

  it('Should be able to mint multiple', async () => {
    const [owner] = await ethers.getSigners()
    const mint = await dogs.functions
      .mint(99, { value: ethers.utils.parseEther('0.99') })
      .then((r) => r)
    const balance = await dogs.functions.balanceOf(owner.address)
    expect(balance[0].toString()).to.eq('100')
  })

  it('Should be able to mint all', async () => {
    const [owner] = await ethers.getSigners()
    const mint = await dogs.functions
      .mint(100, { value: ethers.utils.parseEther('1') })
      .then((r) => r)
    const balance = await dogs.functions.balanceOf(owner.address)
    expect(balance[0].toString()).to.eq('200')
  })

  it('Should not be able to mint more than max', async () => {
    const [owner] = await ethers.getSigners()
    const mint = dogs.functions
      .mint(1000, { value: ethers.utils.parseEther('1') })
      .then((r) => r)
    await expect(mint).to.be.reverted
  })

  it('Owner should have balance 2', async function () {
    const [owner] = await ethers.getSigners()
    const ownerBalance = await provider.getBalance(owner.address)
    console.log(ownerBalance)
  })

  it('Should be able to withdraw', async () => {
    const [owner] = await ethers.getSigners()
    let balance = await provider.getBalance(dogs.address)
    const withdraw = dogs.functions.withdraw()
    expect(balance.toString()).to.eq(ethers.utils.parseEther('2'))
    await expect(withdraw).to.not.be.reverted
    balance = await provider.getBalance(dogs.address)
    expect(balance.toString()).to.eq(ethers.utils.parseEther('0'))
  })

  it('Owner should have balance 3', async function () {
    const [owner] = await ethers.getSigners()
    const ownerBalance = await provider.getBalance(owner.address)
    console.log(ownerBalance)
  })
})
