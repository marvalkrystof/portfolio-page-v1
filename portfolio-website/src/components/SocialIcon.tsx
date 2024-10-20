import '../index.css'

interface SocialIcon {
    filePath : string
    link: string
}

function SocialIcon(props : SocialIcon)  {

  return (
    <>
    <div className="w-9 h-9 opacity-50 hover:opacity-100 hover:transition hover:duration-400 hover:animate-bounce">
    <a href={props.link} target="_blank">
    <img className='w-full h-full' src={props.filePath}></img>
    </a>
    </div>
    </>
  )
}

export default SocialIcon