import { useEffect } from 'react';
import io from 'socket.io-client';
import PrivateRoute from '../components/hoc/PrivateRoute';
import { NavbarChat } from '../components/module';
import { InputChat } from '../components/base';
const Home = (props) => {
  // useEffect(() => {
  //   io(process.env.NEXT_PUBLIC_API_URL);
  // }, []);
  return (
    <>
      <NavbarChat setShowSidebar={props.setShowSidebar}>
        <p className="text-red-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium corporis quam et deserunt veniam eos est.
          Tempore maiores ullam nam, laborum dolor, cum blanditiis ea assumenda delectus vero sapiente repellendus quis?
          Vitae quaerat, quisquam qui porro sed incidunt eos omnis impedit! Iste autem doloremque nesciunt ipsum veniam
          accusamus explicabo ex ducimus quasi repudiandae distinctio provident perferendis neque suscipit, eaque vero
          tempore quos consequatur necessitatibus. Explicabo cum minus eius aperiam soluta suscipit eligendi
          repellendus, dolores provident architecto, sint, quasi adipisci dolorem eaque. Modi eveniet dignissimos
          molestias, rerum quas corrupti. Perspiciatis excepturi blanditiis quasi consectetur aliquid aperiam quidem
          nostrum, sed unde dolorum alias, error qui quibusdam recusandae vel consequuntur fugiat molestiae! Ullam
          voluptatum nihil eum voluptatem. Impedit praesentium voluptates repudiandae, soluta laudantium sequi at
          deserunt id facilis nulla tempore, iure accusamus debitis doloribus saepe quae eius veritatis expedita porro.
          Veniam non, porro, quidem assumenda tenetur autem tempora aspernatur dolores exercitationem atque animi, neque
          facilis placeat necessitatibus voluptatum quam voluptas ex odit dolorum iusto cupiditate adipisci? Modi facere
          distinctio assumenda enim iusto totam eveniet aperiam quod, consectetur explicabo minima quos similique fuga
          eos laboriosam. Quod atque odio delectus laudantium quaerat minus reprehenderit. Eos aspernatur, maxime,
          pariatur repellat maiores perferendis debitis nam nihil porro architecto consequatur dolorum qui consequuntur
          eum quisquam eaque. Quod quaerat ullam, aspernatur natus, libero architecto unde corporis molestiae dolores
          dolor voluptate tempora dolorum asperiores excepturi, perferendis sapiente suscipit rem a nihil aut eius.
          Voluptate alias fugit delectus earum consequuntur excepturi adipisci nam, inventore soluta magnam quae nisi
          aspernatur! Quisquam laudantium sint, voluptate necessitatibus officia saepe tenetur eligendi harum eos et non
          amet iste delectus? Ratione nesciunt doloremque eius tenetur porro iure perspiciatis labore alias explicabo.
          Rem a, nulla sunt fugiat praesentium quisquam. A quia qui est ea laudantium, non laboriosam consequatur sit
          asperiores neque alias mollitia enim dignissimos voluptate aliquid debitis. Tempore illo veniam facilis error
          velit ratione, itaque, quod, nesciunt fugiat corrupti voluptates quasi repudiandae aperiam eveniet vel aut
          quia! Nostrum fugiat voluptatibus tempore maxime sit, quod ipsa quasi quisquam optio illum quo, placeat
          assumenda rerum nulla expedita! Quam exercitationem eum corporis cupiditate placeat blanditiis ullam rerum.
          Accusantium nesciunt praesentium harum, rerum, laboriosam libero expedita omnis cupiditate, vel quis facere
          veniam quidem quod minima reiciendis! Quisquam voluptatum consequuntur quia dolorum et tempore quidem
          reiciendis velit atque tempora corrupti odio sint debitis, nobis eos ad rem. Eos nemo officiis tenetur itaque
          consectetur hic odio laborum nesciunt dignissimos atque nostrum asperiores veniam obcaecati totam, dolorem
          perferendis quo delectus nam, vitae perspiciatis mollitia aliquid ad unde quam! Beatae, id! Ipsam, neque
          blanditiis expedita odit beatae ab sunt aliquid, temporibus aut hic est. Laboriosam dolore repudiandae totam
          voluptas quia aperiam quos, possimus rem consectetur repellat, sed, blanditiis officiis. Delectus iste
          corporis, nam impedit totam dolor provident cumque illum! Soluta accusantium fugit consequatur voluptate quae
          quibusdam possimus ut aspernatur iure, ducimus blanditiis neque culpa quos! Quasi maiores sit, culpa
          consectetur recusandae, iste, illo sapiente nostrum ad praesentium fugit! Harum, hic dicta suscipit nisi animi
          eveniet esse magnam odit velit et quibusdam porro! Inventore, autem sapiente. Minus natus veritatis reiciendis
          reprehenderit doloremque quos adipisci blanditiis iusto atque quod debitis alias ad enim recusandae velit
          perferendis nisi repellat tenetur vero magni delectus, provident odio? Distinctio placeat cum ducimus maiores
          tempora mollitia quaerat nam illo impedit accusamus. Quae consequuntur quod eius alias, culpa, rem non vel,
          vitae exercitationem quibusdam maxime! Eaque soluta necessitatibus quam aspernatur quia quas cumque! Ratione
          corrupti laboriosam, vel ducimus aperiam quasi provident, illum iure quaerat animi eius placeat dolores,
          perferendis ab? Reprehenderit ab rem nobis qui adipisci ex voluptatum, quasi, ullam necessitatibus laborum
          quae doloribus eius atque neque labore. Velit voluptatum, vel ad minus minima at ut iure aliquam laborum atque
          rem doloribus saepe cumque, hic blanditiis nostrum illo vero architecto officiis quo perspiciatis. Totam,
          culpa? Dignissimos aut assumenda consectetur atque enim debitis soluta blanditiis tempora iusto facere
          excepturi nesciunt eius corrupti nam nihil dolorum est quis fuga ea, totam odio quidem tempore officia
          corporis? Doloribus, magnam iusto? Ratione eum deserunt nulla aspernatur error exercitationem debitis harum
          provident repellat quam, possimus, odio ut accusamus id vero inventore optio adipisci? Sunt harum suscipit
          earum. Sequi quasi optio culpa vero necessitatibus nulla ipsam quas voluptatum sit ab odio asperiores fuga
          quisquam, deleniti voluptatem, eum iusto non tempore corrupti sapiente quis eaque. Ad corporis ratione iure
          expedita inventore veniam explicabo, dolore tempore commodi suscipit aut incidunt voluptatem voluptatum
          officia dolor atque neque nisi perspiciatis quas natus laboriosam ab odio? Accusantium voluptatum quaerat
          asperiores dolore maiores nisi repellat labore quasi earum minima iure magni recusandae sunt possimus aliquid
          molestiae veniam, debitis molestias illum. Cupiditate consequatur a illo vero facilis! Aperiam fugiat voluptas
          ad possimus libero. Vel ab, aut nostrum amet sint optio beatae ipsa architecto enim sit exercitationem quis
          cumque laudantium quibusdam sed quae consequatur quos quaerat commodi deserunt mollitia voluptate aspernatur
          qui! Nihil dignissimos non tempore ab architecto ipsam ratione quaerat odio quam ducimus assumenda at qui
          aliquid illo, quasi nobis sapiente provident mollitia! Placeat, quia quod, ut perferendis debitis unde sed
          aliquid tenetur aperiam est ipsa accusantium dolores dolorum qui fugiat! Voluptate quam cupiditate eum
          corrupti molestias repudiandae laboriosam modi aliquid omnis? Ipsam est facere laboriosam maiores vitae odio
          velit nostrum aliquam deserunt, hic exercitationem odit cumque nisi consectetur temporibus ducimus nemo nam
          nulla dolores fuga quasi autem! Unde aperiam modi minus deserunt rerum porro consequuntur officia. Modi minus
          sed neque nostrum voluptatibus suscipit molestias. Itaque, sequi velit saepe, officiis voluptas voluptate ipsa
          quae sunt numquam, atque quis quod doloribus voluptatem facere. Quam veritatis porro velit saepe adipisci
          aliquid maxime commodi maiores, omnis, alias at ipsam mollitia? Molestias voluptatum et aliquam. Modi quos
          consequatur tenetur pariatur doloribus aspernatur, porro sequi eos iure laudantium, eligendi at non dolorem
          quas quibusdam sapiente voluptate facere ipsum aliquam. Inventore aut natus ratione maiores dolorum quisquam
          labore. Amet libero debitis minus ab repellendus recusandae aliquam. Modi hic aut commodi iste atque fugit ex
          rem laudantium delectus, labore, vitae animi debitis, totam nesciunt a architecto odit ullam optio. Rem
          repellat amet excepturi quibusdam nulla! Doloremque quo incidunt aliquid ea corporis ullam!
        </p>
      </NavbarChat>
      <div className="flex w-full bg-white box-border" style={{ height: '10vh' }}>
        <InputChat placeholder="Type your message..." />
      </div>
    </>
  );
};

export default PrivateRoute(Home);
