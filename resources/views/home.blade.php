@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}

                    <h3>Buy Movie Tickets N500.00</h3>
                    <form method="POST" action="{{ route('pay') }}" id="paymentForm">
                        {{ csrf_field() }}

                        <input name="name" placeholder="Name" />
                        <input name="email" type="email" placeholder="Your Email" />
                        <input name="phone" type="tel" placeholder="Phone number" />

                        <input type="submit" value="Buy" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
