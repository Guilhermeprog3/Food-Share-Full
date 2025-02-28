"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Calendar } from "@/components/ui/calendar";
import { fetchReserva, CancelReserva, updateReserva } from "./action";

interface Schedule {
  id: string;
  title: string;
  pickup_date: string;
  token: string;
  food: {
    id:string
    name: string;
  };
  food_quantity: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeValue: string;
}

function Modal({ isOpen, onClose, qrCodeValue }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-6 text-center">Confirmar Retirada</h2>
        <div className="flex justify-center mb-6">
          <QRCodeSVG value={qrCodeValue} size={200} />
        </div>
        <Button onClick={onClose} className="w-full bg-primary text-primary-foreground py-2 rounded-2xl">
          Fechar
        </Button>
      </div>
    </div>
  );
}

function PostponeModal({ isOpen, onClose, onSelectDate, initialDate }: any) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-6 text-center">Selecionar Nova Data</h2>
        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
        <div className="flex gap-4 mt-4">
          <Button onClick={onClose} className="w-full bg-gray-500 text-white py-2 rounded-2xl">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} className="w-full bg-primary text-primary-foreground py-2 rounded-2xl">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SchedulesList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostponeModalOpen, setIsPostponeModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(null);

  useEffect(() => {
    const loadReservations = async () => {
      const data = await fetchReserva();
      setSchedules(data);
    };
    loadReservations();
  }, []);

  const handleOpenModal = (id: string) => {
    setSelectedScheduleId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheduleId(null);
  };

  const handleOpenPostponeModal = (id: string, pickup_date: string) => {
    setSelectedScheduleId(id);
    setSelectedScheduleDate(new Date(pickup_date));
    setIsPostponeModalOpen(true);
  };

  const handleClosePostponeModal = () => {
    setIsPostponeModalOpen(false);
    setSelectedScheduleId(null);
    setSelectedScheduleDate(null);
  };

  const handleSelectDate = async (date: Date) => {
    if (selectedScheduleId) {
      await updateReserva(selectedScheduleId, date);
      setSchedules(schedules.map((s) => (s.id === selectedScheduleId ? { ...s, pickup_date: date.toISOString() } : s)));
    }
  };

  const handleCancelReservation = async (id: string) => {
    await CancelReserva(id);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <div className="space-y-8 p-10 rounded-3xl shadow-lg max-w-4xl mx-auto bg-card text-gray-800">
      <h2 className="text-3xl font-bold text-center">Reservas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="rounded-xl shadow-md">
            <CardHeader className="p-4 bg-gray-200 rounded-t-xl">
              <h3 className="text-lg font-semibold">{schedule.title}</h3>
              <p className="text-sm">Data de retirada: {new Date(schedule.pickup_date).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600">Quantidade: {schedule.food_quantity}</p>
              <p className="text-sm text-gray-600">Alimento: {schedule.food.name}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4 space-x-4">
              <Button onClick={() => handleOpenModal(schedule.id)}>QR Code</Button>
              <Button onClick={() => handleOpenPostponeModal(schedule.id, schedule.pickup_date)}>Adiar</Button>
              <Button onClick={() => handleCancelReservation(schedule.id)}>Cancelar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} qrCodeValue={selectedScheduleId ? schedules.find((s) => s.id === selectedScheduleId)?.token || "" : ""} />
      <PostponeModal isOpen={isPostponeModalOpen} onClose={handleClosePostponeModal} onSelectDate={handleSelectDate} initialDate={selectedScheduleDate || undefined} />
    </div>
  );
}
