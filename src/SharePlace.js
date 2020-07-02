import { Modal } from "./UI/modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector("form");
        const locateUserBtn = document.getElementById("locate-btn");
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
        addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    }

    sharePlaceHandler() {
        const shareLinkInputElements = document.getElementById('share-link');
        if (!navigator.clipboard) {
            shareLinkInputElements.select();
            alert("Please copy manually");
            return;
        }

        navigator.clipboard.writeText(shareLinkInputElements.value).then(() => {
            alert("Copied Into Clipboard");
        }).catch(er => {
            console.log(er);
        })

    }

    selectPlace(coordinates, address) {
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }

        this.shareBtn.disabled = false;
        const shareLinkInputeElements = document.getElementById('share-link');
        shareLinkInputeElements.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert(
                "Location feature is not supported by your browser. Please enter manually."
            );
            return;
        }

        const modal = new Modal('loading-modal-content', "Loading Location... Please  Wait")
        modal.show();
        navigator.geolocation.getCurrentPosition(async successResult => {
            const coordinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude
            }
            const address = await getAddressFromCoords(coordinates);
            modal.hide();
            this.selectPlace(coordinates, address);
        }, err => {
            modal.hide();
            alert("Unfortunately couldn't locate you. Please enter manually.")
        })
    }

    async findAddressHandler(event) {
        event.preventDefault();
        const address = document.querySelector("input").value;
        if (!address || address.trim().length == 0) {
            alert("Invalid Address");
            return;
        }
        const modal = new Modal('loading-modal-content', "Loading Location... Please  Wait")
        modal.show();

        try {
            const coordinates = await getCoordsFromAddress(address);
            this.selectPlace(coordinates);
        } catch (er) {
            alert(er.message);
        }
        modal.hide();


    }
}

new PlaceFinder();