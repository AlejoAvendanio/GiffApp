import Card from '../cards/cardGif'
import "./style.css"
import { Loading } from '../loading'


export default function ListGifs({gifs}:any) {
  return (
    <>
      <div className='listGifs'>
        {
          gifs ? gifs?.map((e:any)=><Card src={e?.url} alt={e?.url} id={e?.id} title={e?.title}/> ) : <Loading/>
        }
      </div>
    </>
  );
}
