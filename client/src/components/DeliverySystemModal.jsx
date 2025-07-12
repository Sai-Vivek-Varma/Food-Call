import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  User, 
  Package,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import GradientButton from "./GradientButton";
import { useToast } from "@/hooks/use-toast";

const DeliverySystemModal = ({ open, onClose, donation }) => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    recipientName: "",
    recipientPhone: "",
    deliveryAddress: "",
    specialInstructions: "",
    preferredTime: ""
  });
  const [isBooking, setIsBooking] = useState(false);

  const deliveryOptions = [
    {
      id: "swiggy",
      name: "Swiggy Genie",
      icon: "🟠",
      price: "₹45",
      time: "30-45 mins",
      description: "Quick delivery for nearby locations",
      features: ["Real-time tracking", "Instant booking", "Cash/Digital payment"],
      rating: 4.2,
      available: true
    },
    {
      id: "dunzo",
      name: "Dunzo",
      icon: "🔵",
      price: "₹35",
      time: "25-40 mins",
      description: "Reliable delivery service",
      features: ["Live tracking", "Multiple payment options", "Quick support"],
      rating: 4.1,
      available: true
    },
    {
      id: "porter",
      name: "Porter",
      icon: "🟡",
      price: "₹60",
      time: "40-60 mins",
      description: "For larger quantity deliveries",
      features: ["Heavy items support", "Professional handling", "Insurance covered"],
      rating: 4.3,
      available: true
    },
    {
      id: "ondc",
      name: "ONDC Network",
      icon: "🟢",
      price: "₹25",
      time: "45-75 mins",
      description: "Government-backed open network",
      features: ["Lowest cost", "Transparent pricing", "Wide coverage"],
      rating: 4.0,
      available: false // Will be available in Phase 3
    },
    {
      id: "volunteer",
      name: "Volunteer Pickup",
      icon: "❤️",
      price: "Free",
      time: "2-4 hours",
      description: "Community volunteers will collect",
      features: ["No cost", "Direct impact", "Community support"],
      rating: 4.8,
      available: true
    }
  ];

  const handleBookDelivery = async () => {
    if (!selectedOption) {
      toast({
        title: "Please select a delivery option",
        variant: "destructive"
      });
      return;
    }

    if (!deliveryDetails.recipientName || !deliveryDetails.recipientPhone || !deliveryDetails.deliveryAddress) {
      toast({
        title: "Please fill in all required delivery details",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);

    try {
      // Simulate API call for delivery booking
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Delivery Booked Successfully! 🚚",
        description: `Your food will be picked up and delivered via ${selectedOption.name}`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Truck className="w-6 h-6 text-primary" />
            Delivery Options
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Donation Summary */}
          <Card className="bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Donation Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Food Type</Label>
                  <p className="font-medium">{donation?.foodType || "Mixed Items"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Quantity</Label>
                  <p className="font-medium">{donation?.quantity || "5"} servings</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Pickup From</Label>
                  <p className="font-medium">{donation?.location || "Restaurant Location"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Expiry</Label>
                  <p className="font-medium">Today, 8:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Delivery Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choose Delivery Option</h3>
              
              <div className="space-y-3">
                {deliveryOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedOption?.id === option.id 
                          ? 'ring-2 ring-primary border-primary shadow-lg' 
                          : 'hover:border-primary/30'
                      } ${!option.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => option.available && setSelectedOption(option)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="text-2xl">{option.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{option.name}</h4>
                                {!option.available && (
                                  <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {option.features.map((feature, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  <span className="font-medium">{option.price}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{option.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-500">★</span>
                                  <span>{option.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {selectedOption?.id === option.id && (
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Details Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Delivery Details</h3>
              
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="recipientName"
                        placeholder="Full name of recipient"
                        value={deliveryDetails.recipientName}
                        onChange={(e) => setDeliveryDetails(prev => ({ ...prev, recipientName: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipientPhone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="recipientPhone"
                        placeholder="+91 98765 43210"
                        value={deliveryDetails.recipientPhone}
                        onChange={(e) => setDeliveryDetails(prev => ({ ...prev, recipientPhone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                      <Textarea
                        id="deliveryAddress"
                        placeholder="Complete address with landmarks"
                        value={deliveryDetails.deliveryAddress}
                        onChange={(e) => setDeliveryDetails(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                        className="pl-10 min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Delivery Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="preferredTime"
                        type="datetime-local"
                        value={deliveryDetails.preferredTime}
                        onChange={(e) => setDeliveryDetails(prev => ({ ...prev, preferredTime: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                      <Textarea
                        id="specialInstructions"
                        placeholder="Any special handling instructions..."
                        value={deliveryDetails.specialInstructions}
                        onChange={(e) => setDeliveryDetails(prev => ({ ...prev, specialInstructions: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              {selectedOption && (
                <Card className="bg-gradient-to-r from-sage-50 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-base">Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>{selectedOption.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Platform Fee</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes</span>
                      <span>₹0</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{selectedOption.price}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Warning for ONDC */}
              {selectedOption?.id === "ondc" && (
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Coming Soon</h4>
                        <p className="text-sm text-yellow-700">
                          ONDC delivery integration is currently in development. This option will be available in our next update.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <GradientButton 
              onClick={handleBookDelivery}
              disabled={!selectedOption || isBooking}
              loading={isBooking}
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Truck className="w-4 h-4 mr-2" />
                  Book Delivery
                </>
              )}
            </GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliverySystemModal;