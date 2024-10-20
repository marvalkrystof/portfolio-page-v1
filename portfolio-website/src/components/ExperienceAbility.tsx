import '../index.css'


interface Ability {
    name : string
}



function ExperienceAbility(props : Ability) {

  return (
    <>
    <div className="border border-transparent text-white rounded-2xl pl-2 pr-2 bg-background-complementary text-base">
    {props.name}
    </div>
    </>
  )
}

export default ExperienceAbility
