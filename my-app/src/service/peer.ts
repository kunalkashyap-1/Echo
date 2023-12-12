"use client"
export default class PeerService {
  public peer: RTCPeerConnection | undefined;

  constructor() {
    if (typeof window !== 'undefined') {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
          {
            urls: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
          {
            urls: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            urls: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            urls: "turn:turn.bistri.com:80",
            credential: "homeo",
            username: "homeo",
          },
          {
            urls: "turn:turn.anyfirewall.com:443?transport=tcp",
            credential: "webrtc",
            username: "webrtc",
          },
        ],
      });
    }
  }

  async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocalDescription(ans: RTCSessionDescriptionInit): Promise<void> {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  close(): void {
    if (this.peer) {
      // Close peer connection and release resources
      this.peer.close();
      this.peer = undefined;
    }
  }
}

