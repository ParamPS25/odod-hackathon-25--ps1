import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

export const useOfferStore = create((set, get) => ({
    offers: [],
    sentOffers: [],
    receivedOffers: [],
    isCreatingOffer: false,
    isLoadingOffers: false,
    isUpdatingOffer: false,

    // Create a new offer
    createOffer: async (offerData) => {
        set({ isCreatingOffer: true });
        try {
            const res = await axiosInstance.post('/offers', offerData);
            
            // Update the sent offers list
            const currentSentOffers = get().sentOffers;
            set({ sentOffers: [...currentSentOffers, res.data.offer] });
            
            toast.success("Offer sent successfully!");
            return res.data;
        } catch (error) {
            console.error("Create offer error:", error);
            const errorMessage = error.response?.data?.message || "Failed to send offer";
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isCreatingOffer: false });
        }
    },

    // Get all offers (both sent and received)
    getOffers: async () => {
        set({ isLoadingOffers: true });
        try {
            const res = await axiosInstance.get('/offers');
            const offers = res.data.offers || [];
            
            // Separate sent and received offers
            const sentOffers = offers.filter(offer => offer.senderId === get().authUser?.id);
            const receivedOffers = offers.filter(offer => offer.receiverId === get().authUser?.id);
            
            set({ 
                offers: offers,
                sentOffers: sentOffers,
                receivedOffers: receivedOffers 
            });
            
            return offers;
        } catch (error) {
            console.error("Get offers error:", error);
            toast.error("Failed to load offers");
            throw error;
        } finally {
            set({ isLoadingOffers: false });
        }
    },

    // Accept or reject an offer
    updateOfferStatus: async (offerId, status) => {
        set({ isUpdatingOffer: true });
        try {
            const res = await axiosInstance.put(`/offers/${offerId}`, { status });
            
            // Update the offers in state
            const currentOffers = get().offers;
            const updatedOffers = currentOffers.map(offer => 
                offer._id === offerId ? { ...offer, status } : offer
            );
            
            const currentReceivedOffers = get().receivedOffers;
            const updatedReceivedOffers = currentReceivedOffers.map(offer => 
                offer._id === offerId ? { ...offer, status } : offer
            );
            
            set({ 
                offers: updatedOffers,
                receivedOffers: updatedReceivedOffers
            });
            
            toast.success(`Offer ${status} successfully!`);
            return res.data;
        } catch (error) {
            console.error("Update offer error:", error);
            const errorMessage = error.response?.data?.message || `Failed to ${status} offer`;
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isUpdatingOffer: false });
        }
    },

    // Delete an offer
    deleteOffer: async (offerId) => {
        try {
            await axiosInstance.delete(`/offers/${offerId}`);
            
            // Remove from state
            const currentOffers = get().offers;
            const currentSentOffers = get().sentOffers;
            const currentReceivedOffers = get().receivedOffers;
            
            set({
                offers: currentOffers.filter(offer => offer._id !== offerId),
                sentOffers: currentSentOffers.filter(offer => offer._id !== offerId),
                receivedOffers: currentReceivedOffers.filter(offer => offer._id !== offerId)
            });
            
            toast.success("Offer deleted successfully!");
        } catch (error) {
            console.error("Delete offer error:", error);
            const errorMessage = error.response?.data?.message || "Failed to delete offer";
            toast.error(errorMessage);
            throw error;
        }
    },

    // Clear offers (useful for logout)
    clearOffers: () => {
        set({
            offers: [],
            sentOffers: [],
            receivedOffers: []
        });
    }
}));