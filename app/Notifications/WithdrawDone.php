<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WithdrawDone extends Notification implements ShouldQueue
{
    use Queueable;
    private $publisherMail;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($publisherMail)
    {
        $this->publisherMail = $publisherMail;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line($this->publisherMail['name'])
            ->line($this->publisherMail['body'])
            ->line($this->publisherMail['thanks']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'amount' => $this->publisherMail['amount'],
            'bank' => $this->publisherMail['bank'],
            'bank_acc' => $this->publisherMail['bank_acc']
        ];
    }
}
