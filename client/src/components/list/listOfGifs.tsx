import Card from '../cards/cardGif'
import "./style.css"
import { Loading } from '../loading'

export type Gifs = {
  url:string,
  id:string,
  title:string
}
type Props= {
  gifs: Gifs[]
}
export default function ListGifs({gifs}:Props) {
  return (
    <>
      <div className='listGifs'>
        {
          gifs?.length ? gifs?.map((e:Gifs)=><Card src={e?.url} alt={e?.url} key={e?.id} id={e?.id} title={e?.title}/> ) : <Loading/>
        }
      </div>
    </>
  );
}
