//===================================== Imports ==============================================
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sunrise, Sunset, Compass, Gauge, ArrowDown, ArrowUp, Thermometer, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";
import type { WeatherData } from "@/api/types";

//===================================== Type Definitions ==============================================
interface WeatherDetailsProps {
  data: WeatherData;
}

//===================================== Weather Details Component ==============================================
export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys } = data;

  //===================================== Helper Functions ==============================================
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  //===================================== Details Configuration ==============================================
  const details = [
    {
      title: "Current Temperature",
      value: formatTemp(main.temp),
      icon: Thermometer,
      color: "text-yellow-500",
    },
    {
      title: "Min Temperature",
      value: formatTemp(main.temp_min),
      icon: ArrowDown,
      color: "text-blue-500",
    },
    {
      title: "Max Temperature",
      value: formatTemp(main.temp_max),
      icon: ArrowUp,
      color: "text-red-500",
    },
    {
      title: "Feels Like",
      value: formatTemp(main.feels_like),
      icon: Thermometer,
      color: "text-orange-500",
    },
    {
      title: "Humidity",
      value: `${main.humidity}%`,
      icon: Droplets,
      color: "text-cyan-500",
    },
    {
      title: "Wind Speed",
      value: `${wind.speed} m/s`,
      icon: Wind,
      color: "text-sky-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
