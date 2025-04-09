import React from "react";
import "./Reward.css";
import ExpBar from "./exp-notif-cal.tsx";
import { SiNetflix, SiSpotify, SiCanva, SiDiscord, SiScribd, SiYoutube, SiGrammarly, SiValorant, SiRoblox } from "react-icons/si";

export default function Reward() {
  return (
    <React.Fragment>
      <ExpBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4 ms-4">Rewards</h1>
        <div className="row ms-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiSpotify size={100} />
            </div>
            <div>Spotify Premium</div>
            <div>1 Month</div>
            <div>15,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiNetflix size={100} />
            </div>
            <div>Netflix</div>
            <div>1 Month</div>
            <div>100,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiCanva size={100} />
            </div>
            <div>Canva Pro</div>
            <div>1 Month</div>
            <div>12,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiDiscord size={100} />
            </div>
            <div>Discord Nitro</div>
            <div>1 Month</div>
            <div>100,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiScribd size={100} />
            </div>
            <div>Scribd Subscription</div>
            <div>1 Month</div>
            <div>100,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiYoutube size={100} />
            </div>
            <div>YouTube Premium</div>
            <div>1 Month</div>
            <div>100,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiGrammarly size={100} />
            </div>
            <div>Grammarly Pro</div>
            <div>1 Month</div>
            <div>100,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiValorant size={100} />
            </div>
            <div>Valorant Points</div>
            <div>1000 VP</div>
            <div>100,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
          <div className="card col-3 m-4 border rounded shadow flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center justify-center">
              <SiRoblox size={100} />
            </div>
            <div>Robux</div>
            <div>400 Robux</div>
            <div>100,000 Experience</div>
            <progress />
            <div className="btn btn-warning">claim</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}